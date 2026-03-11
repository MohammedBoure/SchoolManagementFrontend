// sections/js/base.js

const AppConfig = {
    // الرابط الأساسي للسيرفر (مكان واحد لتغييره مستقبلاً)
    BASE_URL: 'http://qylad.duckdns.org:2000/crud',

    /**
     * الدالة المركزية والأساسية التي تمر عبرها جميع طلبات النظام
     * @param {string} endpoint - اسم الجدول (مثل: teachers, students, classes)
     * @param {string} method - نوع الطلب (GET, POST, PUT, DELETE)
     * @param {object|null} payload - البيانات المرسلة (في حالة الإضافة أو التحديث)
     */
    async request(endpoint, method = 'GET', payload = null) {
        const timestamp = new Date().toLocaleTimeString();
        const requestUrl = `${this.BASE_URL}/${endpoint}`;
        
        const colors = {
            GET: '#3498db',    
            POST: '#2ecc71',   
            PUT: '#f39c12',    
            DELETE: '#e74c3c'  
        };
        const badgeColor = colors[method] || '#95a5a6';

        console.group(`%c [${method}] 🚀 API: ${endpoint}`, `color: ${badgeColor}; font-weight: bold; font-size: 13px;`);
        console.log(`[${timestamp}] 🔗 URL:`, requestUrl);

        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        if (payload) {
            options.body = JSON.stringify(payload);
            console.log(`[${timestamp}] 📦 Payload Sent:`, payload);
        }

        try {
            const response = await fetch(requestUrl, options);
            console.log(`[${timestamp}] 📥 Status:`, response.status, response.statusText);

            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            // 🌟 التعديل هنا: قراءة الرد كنص عادي أولاً لمنع انهيار النظام إذا كان فارغاً
            const responseText = await response.text();

            // إذا كان الرد فارغاً (كما هو الحال مع 201 Created أو 204 No Content في سيرفرك)
            if (!responseText) {
                console.log(`[${timestamp}] ✅ Success (Empty Response Body)`);
                console.groupEnd();
                return { success: true }; 
            }

            // إذا كان هناك نص (JSON)، نقوم بتحويله
            const data = JSON.parse(responseText);

            console.log(`[${timestamp}] ✅ Data Received:`, {
                type: Array.isArray(data) ? `Array (${data.length} items)` : 'Object',
                data: data
            });

            console.groupEnd();
            return data;

        } catch (error) {
            console.error(`[${timestamp}] ❌ API Error on [${method}] ${endpoint}:`, error.message);
            console.groupEnd();
            return null;
        }
    },

    // =========================================================
    // دوال مساعدة (Helpers) لتسهيل الكتابة في الصفحات الأخرى
    // =========================================================

    // جلب بيانات
    async get(endpoint) {
        return await this.request(endpoint, 'GET');
    },

    // إضافة بيانات جديدة
    async post(endpoint, data) {
        return await this.request(endpoint, 'POST', data);
    },

    // تحديث بيانات موجودة (نمرر اسم الجدول، والـ ID، والبيانات الجديدة)
    async put(endpoint, id, data) {
        const url = id ? `${endpoint}/${id}` : endpoint;
        return await this.request(url, 'PUT', data);
    },

    // حذف بيانات
    async delete(endpoint, id) {
        const url = id ? `${endpoint}/${id}` : endpoint;
        return await this.request(url, 'DELETE');
    }
};

Object.freeze(AppConfig);