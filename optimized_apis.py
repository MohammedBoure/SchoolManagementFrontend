import json
import os

def extract_used_schemas(obj, all_schemas, used_schemas_dict):
    """
    Recursively scans the provided object for '$ref' keys.
    Extracts strictly the required schemas to prevent AI hallucination
    and reduce context window bloat for Frontend developers.
    """
    if isinstance(obj, dict):
        for key, value in obj.items():
            if key == "$ref" and isinstance(value, str) and value.startswith("#/components/schemas/"):
                schema_name = value.split("/")[-1]
                
                if schema_name not in used_schemas_dict and schema_name in all_schemas:
                    used_schemas_dict[schema_name] = all_schemas[schema_name]
                    # Recursively check if this schema depends on another schema
                    extract_used_schemas(all_schemas[schema_name], all_schemas, used_schemas_dict)
            else:
                extract_used_schemas(value, all_schemas, used_schemas_dict)
    elif isinstance(obj, list):
        for item in obj:
            extract_used_schemas(item, all_schemas, used_schemas_dict)

def deterministic_split_api(input_filepath, output_directory, base_url):
    """
    Deterministically splits an OpenAPI JSON file into distinct modules
    based strictly on the 'tags' array inside each endpoint operation.
    """
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    with open(input_filepath, 'r', encoding='utf-8') as file:
        data = json.load(file)

    openapi_version = data.get('openapi', '3.1.0')
    api_version = data.get('info', {}).get('version', '1.0.0')
    
    all_schemas = data.get('components', {}).get('schemas', {})
    paths = data.get('paths', {})
    
    # ---------------------------------------------------------
    # DETERMINISTIC ROUTING LOGIC (Based strictly on Tags)
    # ---------------------------------------------------------
    grouped_modules = {}

    for path_url, path_methods in paths.items():
        for method, operation in path_methods.items():
            # Ensure it's a valid operation object with at least one tag
            if isinstance(operation, dict) and 'tags' in operation and operation['tags']:
                tag_name = operation['tags'][0] # The primary tag is the table name

                # Initialize the dictionary for this tag if it doesn't exist
                if tag_name not in grouped_modules:
                    grouped_modules[tag_name] = {}
                
                # Initialize the path under this tag if it doesn't exist
                if path_url not in grouped_modules[tag_name]:
                    grouped_modules[tag_name][path_url] = {}

                # Map the exact method and operation to its deterministic tag
                grouped_modules[tag_name][path_url][method] = operation

    # ---------------------------------------------------------
    # GENERATE OPTIMIZED OUTPUT FILES
    # ---------------------------------------------------------
    for table_name, table_paths in grouped_modules.items():
        
        # 1. Extract ONLY the schemas required by this specific table
        used_schemas = {}
        extract_used_schemas(table_paths, all_schemas, used_schemas)

        # 2. Format a clean title (e.g., "academic_years" -> "Academic Years")
        formatted_title = table_name.replace('_', ' ').title()

        # 3. Build the clean, AI-ready JSON structure
        clean_output = {
            "openapi": openapi_version,
            "info": {
                "title": f"{formatted_title} API Docs",
                "description": f"Strict API specification for the '{table_name}' table. Use this to generate frontend services, API calls, and UI components.",
                "version": api_version
            },
            "servers": [
                {
                    "url": base_url,
                    "description": "Production Backend Server"
                }
            ],
            "paths": table_paths,
            "components": {
                "schemas": used_schemas
            }
        }

        # 4. Save to disk
        output_filename = os.path.join(output_directory, f"{table_name}.json")
        with open(output_filename, 'w', encoding='utf-8') as out_file:
            json.dump(clean_output, out_file, indent=4, ensure_ascii=False)
        
        print(f"[SUCCESS] Generated: {output_filename} (Includes only relevant schemas)")

    # ---------------------------------------------------------
    # GENERATE REGISTRY.JSON FILE
    # ---------------------------------------------------------
    registry_data = list(grouped_modules.keys())
    registry_filename = os.path.join(output_directory, "registry.json")
    
    with open(registry_filename, 'w', encoding='utf-8') as reg_file:
        json.dump(registry_data, reg_file, indent=4, ensure_ascii=False)
        
    print(f"\n[SUCCESS] Generated: {registry_filename} containing {len(registry_data)} modules.")


if __name__ == "__main__":
    # --- Configuration ---
    input_file = "apis.json"          # Put your large JSON file name here
    output_folder = "shared"        # The output folder
    backend_url = "http://qylad.duckdns.org:2000" # Your explicit backend URL
    
    try:
        print("Starting deterministic API split...\n")
        deterministic_split_api(input_file, output_folder, backend_url)
        print("\n[DONE] All API modules and registry are optimized and ready for Frontend/AI consumption!")
    except FileNotFoundError:
        print(f"[ERROR] Could not find the file: '{input_file}'.")
    except Exception as e:
        print(f"[ERROR] An unexpected error occurred: {str(e)}")