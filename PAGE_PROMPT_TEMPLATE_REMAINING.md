# 📄 PAGE PROMPT TEMPLATE — الملفات المتبقية
## الـ 16 صفحة غير المنفذة بعد

> **الموجود بالفعل:** fees, payrolls, expenses, attendance, inventory, messages, users, enrollments, schedules
> **هذا الملف يحتوي على:** branches, academic-years, financial-policies, system-logs, teachers, parents, programs, classes, students, assignments, grades, stock-actions, consumptions, obligations, cash-handovers, notifications

---

### 🏗️ تذكير: ما يُورَث تلقائياً في كل صفحة

```
✅ Sidebar + Header + Breadcrumb  ← layout.js
✅ Theme / Toast / Modals          ← layout.js
✅ style.css كامل مع Responsive   ← style.css

مكونات جاهزة:
  .kpi-grid .kpi-card              .card .card-header .card-body
  .data-table .table-wrapper       .badge badge-*
  .btn btn-primary/ghost/accent    .form-input .form-select
  .modal .modal-overlay            .tabs .tab-btn
  .pagination                      .action-btns .action-btn
  .alert-item .alert-list          .progress-bar-wrap
  .search-input-wrap               .avatar avatar-*
  .form-row                        .empty-state
```

---

## 1 — 🏢 branches — إدارة الفروع

```
PAGE_ID: branches
PAGE_TITLE: 🏢 إدارة الفروع
PAGE_SUBTITLE: إدارة فروع المدرسة وبياناتها

HEADER_ACTIONS:
  - فرع جديد | btn-primary | openModal('modal-add-branch')

KPI_CARDS:
  - 3     | إجمالي الفروع      | blue
  - 2     | فروع نشطة          | green
  - 487   | إجمالي الطلاب       | orange
  - 34    | إجمالي الموظفين     | gray

TABLE:
  id: branches-table
  columns:
    - الفرع         | avatar (أحرف) + الاسم + الكود
    - العنوان       | text (address)
    - الهاتف        | text (phone)
    - المدير        | text (manager_name)
    - عدد الطلاب    | text (students_count)
    - عدد الموظفين  | text (staff_count)
    - الحالة        | toggle switch (is_active)
    - الإجراءات     | عرض | تعديل
  pagination: false

MODALS:
  modal-add-branch:
    title: 🏢 إضافة فرع جديد
    fields:
      - اسم الفرع | text | مثال: الفرع الرئيسي | required
      - كود الفرع | text | مثال: BR-001 | required
      - العنوان   | textarea | العنوان الكامل للفرع | required
      - الهاتف    | tel | required
      - البريد الإلكتروني | email
      - المدير المسؤول | select: -- اختر مستخدماً -- | required
      - ملاحظات   | textarea | اختياري
    submit_label: إنشاء الفرع
    submit_type: primary
    api: POST /api/branches

  modal-edit-branch:
    title: ✏️ تعديل بيانات الفرع
    fields: (نفس modal-add-branch مع تعبئة مسبقة)
    submit_label: حفظ التعديلات
    api: PATCH /api/branches/{id}

API_ENDPOINTS:
  - GET    /api/branches
  - POST   /api/branches
  - PATCH  /api/branches/{id}
  - PATCH  /api/branches/{id}/toggle  ← is_active
  - GET    /api/branches/{id}/stats   ← students_count, staff_count

NOTES:
  - لا يمكن حذف فرع فيه طلاب أو موظفون
  - Toggle is_active يعمل inline مع toast تأكيد
  - عند النقر على اسم الفرع: عرض إحصائياته التفصيلية
  - Card View بديل للجدول (اختياري): كل فرع بطاقة مع أيقونة الموقع
```

---

## 2 — 📅 academic-years — السنوات الدراسية

```
PAGE_ID: academic-years
PAGE_TITLE: 📅 السنوات الدراسية
PAGE_SUBTITLE: إدارة السنوات والفصول الدراسية

HEADER_ACTIONS:
  - سنة دراسية جديدة | btn-primary | openModal('modal-add-year')

SPECIAL_COMPONENTS:
  - بطاقة "السنة الحالية النشطة" في أعلى الصفحة:
      اسم السنة + تاريخ البداية والنهاية + progress bar لنسبة المنقضي
      زر "إغلاق السنة" (يُنبّه بـ modal تأكيد)
      لون أخضر مع icon نجمة

TABLE:
  id: years-table
  columns:
    - السنة الدراسية    | text (name) + badge "نشطة" إن is_current
    - تاريخ البداية     | text (start_date)
    - تاريخ النهاية     | text (end_date)
    - المدة (أيام)      | text (duration_days) محسوب تلقائياً
    - عدد الطلاب        | text (enrolled_students)
    - الحالة            | badge: نشطة(success) / منتهية(gray) / مستقبلية(info)
    - الإجراءات         | عرض الإحصائيات | تعديل | تفعيل (إن لم تكن نشطة)
  pagination: false

MODALS:
  modal-add-year:
    title: 📅 إضافة سنة دراسية
    fields:
      - اسم السنة الدراسية | text | مثال: 2025 - 2026 | required
      - تاريخ البداية      | date | required
      - تاريخ النهاية      | date | required
      - هل هي السنة الحالية؟ | checkbox (is_current)
      - ملاحظات            | textarea | اختياري
    submit_label: إنشاء السنة
    api: POST /api/academic-years

  modal-close-year:
    title: ⚠️ إغلاق السنة الدراسية
    content: تحذير — "سيتم ترقية جميع الطلاب تلقائياً. هذا الإجراء لا يمكن التراجع عنه."
    fields:
      - تأكيد الإغلاق | checkbox | required
    submit_label: تأكيد الإغلاق
    submit_type: btn-danger
    api: POST /api/academic-years/{id}/close

API_ENDPOINTS:
  - GET    /api/academic-years
  - POST   /api/academic-years
  - PATCH  /api/academic-years/{id}
  - POST   /api/academic-years/{id}/activate  ← جعلها الحالية
  - POST   /api/academic-years/{id}/close     ← إغلاق وترقية الطلاب
  - GET    /api/academic-years/{id}/stats

NOTES:
  - لا يمكن أن تكون أكثر من سنة واحدة نشطة في آنٍ واحد
  - عند تفعيل سنة: تُلغى تلقائياً السنة النشطة السابقة مع تحذير
  - duration_days = end_date - start_date (محسوب JavaScript-side)
  - progress bar = (today - start_date) / (end_date - start_date) * 100
```

---

## 3 — 📜 financial-policies — السياسات المالية

```
PAGE_ID: financial-policies
PAGE_TITLE: 📜 السياسات المالية
PAGE_SUBTITLE: إدارة سياسات التسعير والخصومات والتقسيط

HEADER_ACTIONS:
  - سياسة جديدة | btn-primary | openModal('modal-add-policy')

SPECIAL_COMPONENTS:
  - شرح مختصر في أعلى الصفحة (info alert):
    "السياسات المالية تحدد طريقة احتساب الرسوم لكل طالب.
     يمكن ربط كل طالب بسياسة عند التسجيل."

TABLE:
  id: policies-table
  columns:
    - اسم السياسة        | text (name) + وصف مختصر
    - نوع الدفع          | badge: نقدي(info) / أقساط(orange) / خصم(green) / مجاني(gray)
    - نسبة الخصم         | text (discount_percent) — يُعرض فقط إن discount > 0
    - عدد الأقساط        | text (installments_count) — يُعرض إن type=installments
    - عدد الطلاب المرتبطين | text (students_count)
    - الحالة             | toggle switch (is_active)
    - الإجراءات          | عرض | تعديل | نسخ
  pagination: false

MODALS:
  modal-add-policy:
    title: 📜 إضافة سياسة مالية
    fields:
      - اسم السياسة | text | مثال: خصم أسري 20% | required
      - نوع الدفع | select: نقدي كامل / تقسيط / خصم نسبة / إعفاء كامل | required
      - نسبة الخصم (%) | number | 0-100 | يظهر إن type=discount
      - عدد الأقساط    | number | يظهر إن type=installments
      - قيمة كل قسط    | number | auto-calculated | readonly
      - الوصف          | textarea | شرح مختصر للسياسة
      - شروط الاستفادة | textarea | مثال: للعائلات ذات الأبناء المتعددين
    submit_label: حفظ السياسة
    api: POST /api/financial-policies

  modal-policy-detail:
    title: 📋 تفاصيل السياسة
    content:
      - بيانات السياسة كاملة
      - جدول الطلاب المرتبطين بهذه السياسة
      - زر "تعديل"

API_ENDPOINTS:
  - GET    /api/financial-policies
  - POST   /api/financial-policies
  - PATCH  /api/financial-policies/{id}
  - PATCH  /api/financial-policies/{id}/toggle
  - GET    /api/financial-policies/{id}/students
  - POST   /api/financial-policies/{id}/duplicate  ← نسخ

NOTES:
  - لا يمكن حذف سياسة مرتبطة بطلاب (soft delete فقط)
  - عند نسخ سياسة: تُنشأ نسخة باسم "نسخة من [الاسم]"
  - الحقول الديناميكية: تظهر/تختفي حسب نوع الدفع المختار
```

---

## 4 — 🔒 system-logs — سجلات النظام

```
PAGE_ID: system-logs
PAGE_TITLE: 🔒 سجلات النظام
PAGE_SUBTITLE: مراقبة كل الأحداث والتغييرات في النظام

HEADER_ACTIONS:
  - تصدير | btn-ghost | Layout.exportTable('logs-table','logs.csv')
  - مسح السجلات القديمة | btn-ghost (btn-danger style) | openModal('modal-clear-logs')

KPI_CARDS:
  - 1,247  | إجمالي الأحداث اليوم | blue
  - 3      | تحذيرات               | orange
  - 1      | أخطاء                 | red
  - 89     | مستخدم نشط الآن       | green

TABS:
  - كل الأحداث
  - تسجيل الدخول/الخروج (auth)
  - إنشاء/تعديل (create/update)
  - حذف (delete)
  - أخطاء (error)

FILTERS:
  - search: "بحث بالوصف أو المستخدم"
  - select: المستخدم [الكل | ...]
  - select: نوع الحدث [الكل | auth | create | update | delete | error]
  - date range: من / إلى
  - select: مستوى الخطورة [الكل | info | warning | error | critical]

TABLE:
  id: logs-table
  columns:
    - الوقت          | text (timestamp) تفصيلي مع الثانية
    - المستخدم       | avatar + الاسم + الدور
    - نوع الحدث      | badge ملوّن:
                        auth(blue) create(green) update(orange)
                        delete(red) error(danger)
    - الوصف          | text (description) — مختصر، قابل للتوسع بالنقر
    - الكيان المتأثر  | text (entity_type + entity_id) مثال: "طالب #STU-042"
    - عنوان IP        | text (ip_address) — كود monospace
    - col-hide-mobile: المتصفح | text (user_agent مختصر)
  pagination: true

MODALS:
  modal-log-detail:
    title: 🔍 تفاصيل الحدث
    content:
      - عرض كامل للـ payload (JSON formatted)
      - الـ before/after للتغييرات
      - stack trace إن كان error

  modal-clear-logs:
    title: ⚠️ مسح السجلات القديمة
    fields:
      - مسح السجلات الأقدم من | select: أسبوع/شهر/3 أشهر/6 أشهر | required
    submit_label: مسح السجلات
    submit_type: btn-danger
    api: DELETE /api/system-logs/clear?older_than=

API_ENDPOINTS:
  - GET    /api/system-logs?page=&type=&user=&from=&to=&level=
  - GET    /api/system-logs/{id}
  - DELETE /api/system-logs/clear?older_than=

NOTES:
  - الجدول للقراءة فقط — لا يوجد تعديل أو حذف فردي
  - timestamp يُعرض بالتوقيت المحلي
  - النقر على صف يفتح modal-log-detail
  - السجلات تُرتَّب من الأحدث للأقدم
  - الأخطاء والتحذيرات: لون خلفية الصف ملوّن خفيف
```

---

## 5 — 👨‍🏫 teachers — إدارة المعلمين

```
PAGE_ID: teachers
PAGE_TITLE: 👨‍🏫 إدارة المعلمين
PAGE_SUBTITLE: ملفات المعلمين وتخصصاتهم وجداولهم

HEADER_ACTIONS:
  - تصدير | btn-ghost
  - معلم جديد | btn-primary | openModal('modal-add-teacher')

KPI_CARDS:
  - 18  | إجمالي المعلمين    | blue
  - 15  | نشطون              | green
  - 5   | تخصصات مختلفة      | orange
  - 312 | حصة هذا الشهر      | gray

FILTERS:
  - search: "بحث بالاسم أو التخصص"
  - select: التخصص [الكل | رياضيات | لغة عربية | علوم | ...]
  - select: الحالة [الكل | نشط | موقوف]

SPECIAL_COMPONENTS:
  - VIEW TOGGLE: زر تبديل بين Card View و Table View (افتراضي: Card)

  Card View:
    كل معلم بطاقة تحتوي:
      - avatar دائري كبير (أحرف الاسم)
      - الاسم الكامل (Bold)
      - التخصص (badge ملوّن)
      - تاريخ التعيين
      - عدد الفصول المُسندة
      - الراتب الأساسي (للأدمن فقط)
      - أزرار: [جدوله الأسبوعي] [ملف المعلم]
    Grid: repeat(auto-fill, minmax(240px, 1fr))

  Table View:
    id: teachers-table
    columns:
      - المعلم         | avatar + الاسم
      - التخصص         | badge
      - تاريخ التعيين   | text
      - الفصول المسندة | text (classes_count)
      - الراتب الأساسي | text (base_salary) — admin only
      - الحالة         | toggle switch
      - الإجراءات      | عرض | تعديل | الجدول

MODALS:
  modal-add-teacher:
    title: 👨‍🏫 إضافة معلم جديد
    fields:
      - الاسم الكامل     | text | required
      - تاريخ الميلاد    | date
      - الجنس            | select: ذكر / أنثى
      - التخصص           | text | مثال: رياضيات | required
      - المواد التي يدرّسها | multi-select (checkboxes من قائمة المواد)
      - تاريخ التعيين    | date | required
      - الراتب الأساسي   | number | required
      - رقم الهاتف       | tel
      - البريد الإلكتروني | email
      - رقم الهوية       | text
      - ملاحظات          | textarea
    submit_label: إضافة المعلم
    api: POST /api/teachers

  modal-teacher-profile:
    title: 📋 ملف المعلم الكامل
    content:
      - tabs داخلية: [البيانات الشخصية | الجدول الأسبوعي | الرواتب | إسناد المهام]
      - الجدول الأسبوعي: mini grid مضغوط
      - آخر 3 رواتب: جدول صغير
    size: modal-lg (max-width: 700px)

API_ENDPOINTS:
  - GET    /api/teachers?page=&subject=&status=
  - POST   /api/teachers
  - PATCH  /api/teachers/{id}
  - PATCH  /api/teachers/{id}/toggle
  - GET    /api/teachers/{id}/schedule   ← الجدول الأسبوعي
  - GET    /api/teachers/{id}/payrolls   ← آخر الرواتب

NOTES:
  - Card View هو الافتراضي — أكثر وضوحاً للموبايل
  - الراتب الأساسي مخفي للمستخدم العادي (is_admin فقط)
  - عند توقيف المعلم: تحذير بأن له فصولاً مُسندة
```

---

## 6 — 👨‍👩‍👦 parents — أولياء الأمور

```
PAGE_ID: parents
PAGE_TITLE: 👨‍👩‍👦 أولياء الأمور
PAGE_SUBTITLE: بيانات أولياء الأمور وملفات العائلة

HEADER_ACTIONS:
  - تصدير | btn-ghost
  - ولي أمر جديد | btn-primary | openModal('modal-add-parent')

KPI_CARDS:
  - 312  | إجمالي أولياء الأمور | blue
  - 28   | لديهم ديون متأخرة     | red
  - 45   | عائلات متعددة الأبناء  | orange
  - 890  | دج متوسط المديونية    | gray

FILTERS:
  - search: "بحث بالاسم أو رقم الهاتف"
  - select: الفرع
  - select: الحالة المالية [الكل | لا ديون | ديون متأخرة]

TABLE:
  id: parents-table
  columns:
    - ولي الأمر      | avatar + الاسم + الهاتف
    - عدد الأبناء    | text + أيقونة أطفال
    - إجمالي الرسوم  | text (total_fees)
    - المدفوع        | text
    - المتبقي        | text ملوّن (أحمر إن > 0)
    - الفرع          | text
    - آخر تواصل      | text (last_contact)
    - الإجراءات      | ملف العائلة | تواصل

MODALS:
  modal-add-parent:
    title: 👤 إضافة ولي أمر
    fields:
      - الاسم الكامل  | text | required
      - رقم الهاتف    | tel | required
      - رقم هاتف بديل | tel
      - البريد الإلكتروني | email
      - العنوان       | textarea
      - رقم الهوية    | text
      - المهنة        | text
      - ملاحظات       | textarea
    submit_label: إضافة ولي الأمر
    api: POST /api/parents

  modal-family-profile:
    title: 👨‍👩‍👦 ملف العائلة
    content:
      - tabs داخلية: [بيانات ولي الأمر | الأبناء | الوضع المالي]

      tab "الأبناء":
        جدول بالأبناء: الاسم + الفصل + الحالة + رابط لملف الطالب

      tab "الوضع المالي":
        - إجمالي الرسوم على العائلة
        - ما تم دفعه
        - المتبقي
        - progress bar
        - سجل الدفعات: تاريخ + مبلغ + طريقة

      زر "إرسال تذكير بالديون" — يفتح modal-send-reminder

  modal-send-reminder:
    title: 📩 إرسال تذكير بالديون
    fields:
      - قناة الإرسال | select: رسالة نصية / بريد / الاثنان | required
      - نص الرسالة   | textarea | نص افتراضي قابل للتعديل
    submit_label: إرسال
    api: POST /api/parents/{id}/send-reminder

API_ENDPOINTS:
  - GET    /api/parents?page=&status=&branch=
  - POST   /api/parents
  - PATCH  /api/parents/{id}
  - GET    /api/parents/{id}/family-balance
  - GET    /api/parents/{id}/children
  - POST   /api/parents/{id}/send-reminder

NOTES:
  - النقر على صف يفتح modal-family-profile مباشرة
  - عرض مؤشر لوني في صف الجدول إن كان لديه ديون (warning tint)
  - family-balance = مجموع رسوم كل الأبناء المرتبطين
```

---

## 7 — 📚 programs — البرامج والمواد

```
PAGE_ID: programs
PAGE_TITLE: 📚 البرامج والمواد الدراسية
PAGE_SUBTITLE: إدارة البرامج التعليمية والمواد المرتبطة بها

HEADER_ACTIONS:
  - برنامج جديد | btn-primary | openModal('modal-add-program')

SPECIAL_COMPONENTS:
  - عرض من عمودين:
    * العمود الأيسر (35%): قائمة البرامج (list بطاقات)
      كل بطاقة: اسم البرنامج + النوع + السعر + عدد المواد
      النقر يُظهر مواد البرنامج في العمود الأيمن
    * العمود الأيمن (65%): مواد البرنامج المختار
      جدول المواد + زر "إضافة مادة"
      إن لم يُختر برنامج: empty state "اختر برنامجاً لعرض موادّه"

  البرنامج المختار: highlighted بلون brand-primary

TABLE (للمواد — العمود الأيمن):
  id: subjects-table
  columns:
    - اسم المادة   | text (name)
    - الكود        | text (code) monospace
    - عدد الحصص/أسبوع | number (sessions_per_week)
    - الاختياري؟   | badge: إلزامي(success) / اختياري(gray)
    - الإجراءات    | تعديل | حذف

MODALS:
  modal-add-program:
    title: 📚 إضافة برنامج دراسي
    fields:
      - اسم البرنامج   | text | مثال: برنامج الابتدائي | required
      - نوع البرنامج   | select: ابتدائي / متوسط / ثانوي / تحضيري | required
      - سعر نقداً (دج) | number | required
      - سعر بالتقسيط  | number | required
      - الوصف          | textarea
    submit_label: إنشاء البرنامج
    api: POST /api/programs

  modal-add-subject:
    title: ➕ إضافة مادة دراسية
    fields:
      - اسم المادة        | text | required
      - كود المادة        | text | مثال: MATH-01 | required
      - عدد الحصص/أسبوع  | number | required
      - هل هي اختيارية؟  | checkbox (is_optional)
      - ملاحظات           | textarea
    submit_label: إضافة المادة
    api: POST /api/programs/{id}/subjects

API_ENDPOINTS:
  - GET    /api/programs
  - POST   /api/programs
  - PATCH  /api/programs/{id}
  - DELETE /api/programs/{id}
  - GET    /api/programs/{id}/subjects
  - POST   /api/programs/{id}/subjects
  - PATCH  /api/subjects/{id}
  - DELETE /api/subjects/{id}

NOTES:
  - لا يمكن حذف برنامج مرتبط بفصول أو طلاب
  - المواد تُرتَّب drag-and-drop (اختياري — placeholder في الـ prompt)
  - السعر بالتقسيط ≥ السعر نقداً (validation)
```

---

## 8 — 🏫 classes — إدارة الفصول

```
PAGE_ID: classes
PAGE_TITLE: 🏫 إدارة الفصول الدراسية
PAGE_SUBTITLE: مراقبة سعة الفصول والطلاب المسجّلين

HEADER_ACTIONS:
  - فصل جديد | btn-primary | openModal('modal-add-class')

KPI_CARDS:
  - 12  | إجمالي الفصول         | blue
  - 487 | إجمالي الطلاب المسجلين | green
  - 3   | فصول ممتلئة            | red
  - 41  | مقعد شاغر              | orange

FILTERS:
  - select: المستوى [الكل | مستوى أول | ثاني | ثالث | ...]
  - select: الفرع
  - select: السنة الدراسية
  - select: الحالة [الكل | متاح | ممتلئ]

SPECIAL_COMPONENTS:
  - Card Grid (افتراضي):
    كل فصل بطاقة تحتوي:
      - اسم الفصل (Bold كبير)
      - المستوى الدراسي
      - badge السعة مع لون:
          * أخضر إن enrolled < capacity * 0.8
          * برتقالي إن 0.8 ≤ enrolled/capacity < 1
          * أحمر + "ممتلئ" إن enrolled ≥ capacity
      - progress bar أفقي: enrolled / capacity
      - النص: "X / Y مقعد" تحت الـ progress bar
      - أزرار: [قائمة الطلاب] [تعديل]
    Grid: repeat(auto-fill, minmax(220px, 1fr))

MODALS:
  modal-add-class:
    title: 🏫 إضافة فصل جديد
    fields:
      - اسم الفصل        | text | مثال: الفصل الأول أ | required
      - المستوى الدراسي  | select: مستوى أول/ثاني/... | required
      - الفرع            | select | required
      - السنة الدراسية   | select | required (الحالية تلقائياً)
      - الطاقة الاستيعابية | number | required
      - البرنامج الدراسي | select | required
    submit_label: إنشاء الفصل
    api: POST /api/classes

  modal-class-students:
    title: 👨‍🎓 طلاب الفصل
    content:
      - اسم الفصل + عداد الطلاب
      - جدول: الاسم + رقم الطالب + الحالة + رابط للملف
      - زر "تصدير قائمة الطلاب"
    api: GET /api/classes/{id}/students

API_ENDPOINTS:
  - GET    /api/classes?page=&level=&branch=&year=&status=
  - POST   /api/classes
  - PATCH  /api/classes/{id}
  - DELETE /api/classes/{id}  ← soft delete إن فارغ
  - GET    /api/classes/{id}/students
  - GET    /api/classes/{id}/available-seats  ← للاستخدام من enrollments

NOTES:
  - لا يمكن حذف فصل فيه طلاب
  - عند اكتمال الفصل: badge أحمر "ممتلئ" + الزر "تسجيل طالب" disabled
  - checkAvailableSeats = capacity - enrolled_students
```

---

## 9 — 👨‍🎓 students — قاعدة بيانات الطلاب

```
PAGE_ID: students
PAGE_TITLE: 👨‍🎓 قاعدة بيانات الطلاب
PAGE_SUBTITLE: إدارة جميع الطلاب وملفاتهم الشخصية

HEADER_ACTIONS:
  - تصدير Excel | btn-ghost | Layout.exportTable('students-table','students.csv')
  - طالب جديد | btn-primary | openModal('modal-new-student')

KPI_CARDS:
  - 487 | إجمالي الطلاب النشطين | green
  - 12  | طلاب موقوفون           | orange
  - 23  | تسجيلات جديدة الشهر    | blue
  - 28  | لديهم ديون متأخرة      | red

FILTERS:
  - search: "بحث بالاسم أو الرقم"
  - select: الفصل [الكل | ...]
  - select: الحالة [الكل | نشط | موقوف | منسحب]
  - select: السياسة المالية
  - select: الفرع

TABLE:
  id: students-table
  columns:
    - checkbox (تحديد جماعي)
    - الطالب         | avatar + الاسم + #رقم
    - الفصل          | text
    - ولي الأمر      | text + هاتف صغير
    - فصيلة الدم     | badge-info
    - السياسة المالية | text
    - الرسوم المتأخرة | text ملوّن (أحمر إن > 0) — col-hide-mobile
    - الحالة         | badge (نشط/موقوف/منسحب)
    - الإجراءات      | عرض الملف | تعديل | تغيير الحالة
  pagination: true

MODALS:
  modal-new-student:
    title: 👨‍🎓 تسجيل طالب جديد
    fields:
      - الاسم الكامل     | text | required
      - تاريخ الميلاد    | date | required
      - الجنس            | select: ذكر / أنثى | required
      - فصيلة الدم       | select: A+/A-/B+/B-/O+/O-/AB+/AB-
      - ولي الأمر        | select (اختر موجود) + رابط "إضافة جديد" | required
      - الفصل الدراسي    | select | required
      - السياسة المالية  | select
      - معلومات طبية     | textarea
    submit_label: حفظ وتسجيل
    api: POST /api/students

  modal-student-profile:
    title: 📋 ملف الطالب الكامل
    content:
      tabs داخلية:
        [البيانات الشخصية | الحضور | الدرجات | الرسوم | الملاحظات]

      tab "البيانات":
        - كل بيانات الطالب + زر تعديل

      tab "الحضور":
        - نسبة الحضور (دائرة SVG %)
        - آخر 10 غيابات

      tab "الدرجات":
        - جدول: المادة + الدرجة + التاريخ + المعلم

      tab "الرسوم":
        - إجمالي + مدفوع + متبقي + progress bar
        - سجل الدفعات

      tab "ملاحظات":
        - textarea لإضافة ملاحظات إدارية (admin only)
        - سجل الملاحظات السابقة مع التاريخ

  modal-change-status:
    title: 🔄 تغيير حالة الطالب
    fields:
      - الحالة الجديدة | select: نشط / موقوف / منسحب | required
      - سبب التغيير    | textarea | required
    api: PATCH /api/students/{id}/status

API_ENDPOINTS:
  - GET    /api/students?page=&class=&status=&policy=&branch=
  - POST   /api/students
  - PATCH  /api/students/{id}
  - PATCH  /api/students/{id}/status
  - GET    /api/students/{id}/profile  ← كامل البيانات
  - GET    /api/students/{id}/attendance-summary
  - GET    /api/students/{id}/grades
  - GET    /api/students/{id}/fees-summary

NOTES:
  - bulk actions: تحديد متعدد → تغيير حالة جماعي
  - رقم الطالب auto-generated: STU-YYYY-XXXXX
  - البحث يعمل على: الاسم، الرقم، اسم ولي الأمر، رقم هاتفه
```

---

## 10 — 📋 assignments — إسناد المهام للمعلمين

```
PAGE_ID: assignments
PAGE_TITLE: 📋 إسناد المهام للمعلمين
PAGE_SUBTITLE: ربط المعلمين بالمواد والفصول للسنة الدراسية الحالية

HEADER_ACTIONS:
  - تصدير | btn-ghost
  - إسناد جديد | btn-primary | openModal('modal-add-assignment')

KPI_CARDS:
  - 48  | إجمالي الإسنادات الحالية | blue
  - 18  | معلماً نشطاً             | green
  - 12  | فصلاً مُغطى             | orange
  - 3   | مواد بدون معلم           | red

FILTERS:
  - select: المعلم [الكل | ...]
  - select: الفصل [الكل | ...]
  - select: المادة [الكل | ...]
  - select: السنة الدراسية

TABLE:
  id: assignments-table
  columns:
    - المعلم       | avatar + الاسم
    - المادة       | badge ملوّن
    - الفصل        | text
    - السنة الدراسية | text
    - تاريخ الإسناد | text
    - عدد الطلاب    | text (من الفصل) — col-hide-mobile
    - الإجراءات    | تعديل | حذف الإسناد

MODALS:
  modal-add-assignment:
    title: 📋 إسناد جديد
    fields:
      - المعلم           | select (مع البحث live) | required
      - المادة           | select (تُفلتر حسب تخصص المعلم المختار) | required
      - الفصل            | select (تُفلتر حسب المادة المختارة) | required
      - السنة الدراسية   | select (الحالية افتراضياً) | required
    submit_label: تأكيد الإسناد
    api: POST /api/teacher-assignments
    on_duplicate: تحذير "هذا المعلم مسند بالفعل لهذه المادة في هذا الفصل"

  modal-conflict-warning:
    title: ⚠️ تعارض في الإسناد
    content: عرض تفاصيل الإسناد المكرر مع خيارات: إلغاء / استبدال القديم

API_ENDPOINTS:
  - GET    /api/teacher-assignments?teacher=&class=&subject=&year=
  - POST   /api/teacher-assignments
  - PATCH  /api/teacher-assignments/{id}
  - DELETE /api/teacher-assignments/{id}
  - GET    /api/teacher-assignments/check-duplicate?teacher=&subject=&class=

NOTES:
  - الـ select للمواد يُفلتر ديناميكياً حسب تخصص المعلم المختار
  - لا يمكن إسناد نفس (معلم+مادة+فصل) مرتين في نفس السنة
  - حذف الإسناد يحذف الحصص المرتبطة به من الجدول (تأكيد مطلوب)
  - عرض تحذير إن كان المعلم لديه >20 حصة/أسبوع (overload)
```

---

## 11 — ⭐ grades — الدرجات والتقييمات

```
PAGE_ID: grades
PAGE_TITLE: ⭐ الدرجات والتقييمات
PAGE_SUBTITLE: متابعة أداء الطلاب وإصدار الشهادات

HEADER_ACTIONS:
  - تصدير | btn-ghost
  - إضافة تقييم | btn-primary | openModal('modal-add-grade')

KPI_CARDS:
  - 82%  | متوسط الدرجات العام   | blue
  - 34   | طالب ناجح             | green
  - 8    | طالب يحتاج دعم        | orange
  - 3    | طالب راسب             | red

TABS:
  - كل التقييمات
  - الفصل الأول
  - الفصل الثاني
  - السنوي

FILTERS:
  - select: الفصل الدراسي [الكل | ...]
  - select: المادة [الكل | ...]
  - select: المعلم [الكل | ...]
  - select: نتيجة [الكل | ناجح | راسب | ممتاز]
  - date: التاريخ

TABLE:
  id: grades-table
  columns:
    - الطالب       | avatar + الاسم + رقم
    - الفصل        | text
    - المادة        | text
    - المعلم        | text — col-hide-mobile
    - الدرجة       | text Bold مع لون تلقائي:
                      أحمر < 50% | برتقالي 50-70% | أخضر > 70% | ذهبي > 90%
    - من أصل       | text (max_score) — col-hide-mobile
    - النسبة       | badge ملوّن (نفس منطق اللون)
    - التاريخ      | text
    - الإجراءات    | تعديل | شهادة PDF

MODALS:
  modal-add-grade:
    title: ⭐ إضافة تقييم جديد
    fields:
      - الطالب       | select (مع بحث) | required
      - المادة       | select | required
      - الدرجة المحققة | number | required
      - من أصل      | number | required (افتراضي: 20)
      - الفصل الدراسي | select: الأول/الثاني/السنوي | required
      - تاريخ التقييم | date | required
      - ملاحظات المعلم | textarea
    submit_label: حفظ التقييم
    api: POST /api/assessments
    note: النسبة تُحسب auto: (grade/max)*100

  modal-bulk-grades:
    title: 📥 إدخال جماعي للدرجات
    content:
      - اختيار الفصل + المادة + الفصل الدراسي
      - جدول بأسماء طلاب الفصل + حقل درجة لكل طالب
      - زر "حفظ الكل"
    api: POST /api/assessments/bulk

API_ENDPOINTS:
  - GET    /api/assessments?page=&class=&subject=&term=&result=
  - POST   /api/assessments
  - POST   /api/assessments/bulk
  - PATCH  /api/assessments/{id}
  - DELETE /api/assessments/{id}
  - POST   /api/certificates/{student_id}  ← توليد PDF شهادة

NOTES:
  - النتيجة = ناجح إن (grade/max) ≥ 0.5
  - نتيجة "ممتاز" إن ≥ 0.9
  - "يحتاج دعم" إن 0.4 ≤ نسبة < 0.5
  - زر "إدخال جماعي" للمعلم لإدخال كل درجات فصله دفعة واحدة
  - شهادة PDF تحتوي: اسم الطالب، الفصل، السنة، المواد، الدرجات، التوقيع
```

---

## 12 — 🔄 stock-actions — حركة المخزون

```
PAGE_ID: stock-actions
PAGE_TITLE: 🔄 حركة المخزون
PAGE_SUBTITLE: سجل جميع عمليات الإدخال والإخراج من المخزون

HEADER_ACTIONS:
  - تصدير | btn-ghost
  - إضافة حركة | btn-primary | openModal('modal-add-stock-action')

KPI_CARDS:
  - 23  | حركة هذا الأسبوع     | blue
  - 12  | إدخالات (in)         | green
  - 11  | إخراجات (out)        | orange
  - 4   | أصناف وصلت للحد الأدنى | red

TABS:
  - كل الحركات
  - إدخال (in)
  - إخراج (out)

FILTERS:
  - search: "بحث باسم الصنف"
  - select: الصنف [الكل | ...]
  - select: النوع [الكل | إدخال | إخراج]
  - date range: من / إلى
  - select: المسؤول

TABLE:
  id: stock-actions-table
  columns:
    - التاريخ والوقت  | text (timestamp)
    - الصنف          | text (item_name)
    - نوع الحركة     | badge: إدخال(success) / إخراج(warning)
    - الكمية         | text (quantity) Bold
    - رصيد ما بعد    | text (balance_after) — col-hide-mobile
    - السبب          | text (reason)
    - المسؤول        | avatar + اسم
    - الإجراءات      | عرض تفاصيل
  pagination: true

MODALS:
  modal-add-stock-action:
    title: 🔄 تسجيل حركة مخزون
    fields:
      - الصنف        | select (مع بحث live) | required
      - الرصيد الحالي | text | disabled (auto-filled من المخزون)
      - نوع الحركة   | select: إدخال (in) / إخراج (out) | required
      - الكمية       | number | required
        validation: إن out → لا تتجاوز الرصيد الحالي
      - السبب        | text | required
      - ملاحظات      | textarea
    submit_label: تأكيد الحركة
    api: POST /api/inventory/actions
    on_success: toast "تم تسجيل الحركة — الرصيد الجديد: X"

API_ENDPOINTS:
  - GET    /api/inventory/logs?page=&type=&item=&from=&to=
  - POST   /api/inventory/actions
  - GET    /api/inventory/logs/{id}

NOTES:
  - balance_after = رصيد قبل ± الكمية (يُحسب backend)
  - لا يمكن إخراج أكثر من الرصيد المتاح (validation client + server)
  - كل حركة تُنشئ تلقائياً تنبيه إن وصل الرصيد ≤ reorder_level
  - الجدول مرتب من الأحدث للأقدم
```

---

## 13 — 🍽️ consumptions — الاستهلاك اليومي

```
PAGE_ID: consumptions
PAGE_TITLE: 🍽️ الاستهلاك اليومي
PAGE_SUBTITLE: تسجيل استهلاك المواد الغذائية والمستلزمات يومياً

HEADER_ACTIONS:
  - تصدير | btn-ghost
  - تسجيل استهلاك اليوم | btn-primary | openModal('modal-add-consumption')

KPI_CARDS:
  - 3,250 دج | تكلفة اليوم            | blue
  - 18,400 دج | تكلفة الأسبوع         | orange
  - 67,200 دج | تكلفة الشهر           | red
  - 31       | صنفاً مستهلكاً الشهر   | green

SPECIAL_COMPONENTS:
  - بطاقة "استهلاك اليوم":
    إن تم تسجيل الاستهلاك: عرض الأصناف + الكمية + التكلفة الإجمالية + badge "مسجّل"
    إن لم يُسجّل: alert برتقالي "لم يُسجّل استهلاك اليوم بعد" + زر "سجّل الآن"

TABLE — السجل التاريخي:
  id: consumptions-table
  columns:
    - التاريخ          | text
    - الأصناف المستهلكة | text (عدد الأصناف أو "5 أصناف")
    - التكلفة الإجمالية | text (total_cost)
    - المسجّل           | avatar + اسم
    - الحالة            | badge: مسجّل(success) / غير مسجّل(danger)
    - الإجراءات         | عرض التفاصيل | تعديل (إن نفس اليوم)
  pagination: true

MODALS:
  modal-add-consumption:
    title: 🍽️ تسجيل استهلاك اليوم
    content:
      - تاريخ اليوم (readonly — اليوم تلقائياً)
      - جدول ديناميكي لإدخال الأصناف:
          [الصنف (select) | الكمية المستهلكة | سعر الوحدة (auto) | الإجمالي (auto)]
          زر "+ إضافة صنف" يضيف صفاً جديداً
          زر حذف لكل صف
      - إجمالي التكلفة: يُحسب تلقائياً (SUM)
    submit_label: تأكيد وحفظ
    api: POST /api/daily-consumptions
    validation: لا يمكن تسجيل يومين لنفس التاريخ

  modal-consumption-detail:
    title: 📋 تفاصيل استهلاك اليوم
    content:
      - التاريخ
      - جدول: الصنف | الكمية | سعر الوحدة | الإجمالي
      - المجموع الكلي
      - ملاحظات

API_ENDPOINTS:
  - GET    /api/daily-consumptions?page=&from=&to=
  - GET    /api/daily-consumptions?date=today  ← للتحقق من اليوم
  - POST   /api/daily-consumptions
  - PATCH  /api/daily-consumptions/{id}        ← تعديل نفس اليوم فقط
  - GET    /api/daily-consumptions/{id}

NOTES:
  - سعر الوحدة يُملأ تلقائياً من المخزون عند اختيار الصنف
  - الكمية الإجمالية = تُخصم تلقائياً من المخزون عند الحفظ
  - لا يمكن تعديل استهلاك يوم سابق (أكثر من 24 ساعة) — admin only
  - calculate_total_cost = SUM(quantity × unit_price) لكل صنف
```

---

## 14 — 📌 obligations — الالتزامات الخارجية

```
PAGE_ID: obligations
PAGE_TITLE: 📌 الالتزامات الخارجية
PAGE_SUBTITLE: متابعة الالتزامات المالية تجاه الموردين والجهات الخارجية

HEADER_ACTIONS:
  - تصدير | btn-ghost
  - التزام جديد | btn-primary | openModal('modal-add-obligation')

KPI_CARDS:
  - 285,000 دج | إجمالي الالتزامات   | blue
  - 142,000 دج | المدفوع             | green
  - 143,000 دج | المتبقي             | red
  - 3           | مواعيد استحقاق قريبة (خلال 7 أيام) | orange

TABS:
  - كل الالتزامات
  - مستحقة قريباً (≤ 7 أيام)
  - متأخرة (overdue)
  - مسددة

TABLE:
  id: obligations-table
  columns:
    - المورد/الجهة    | text (supplier_name) Bold
    - نوع الالتزام   | badge ملوّن:
                        إيجار(blue) ضريبة(red) مورد(orange) خدمات(green) أخرى(gray)
    - المبلغ المستحق  | text (total_amount)
    - المدفوع        | text
    - المتبقي        | text ملوّن (أحمر)
    - progress bar   | (paid/total * 100) inline مضغوط
    - تاريخ الاستحقاق | text + badge: متأخر(danger) / قريب(warning) / عادي
    - الإجراءات      | تسجيل دفعة | تعديل | عرض سجل الدفعات

MODALS:
  modal-add-obligation:
    title: 📌 إضافة التزام جديد
    fields:
      - اسم المورد / الجهة | text | required
      - نوع الالتزام       | select: إيجار/ضريبة/مورد/خدمات/أخرى | required
      - المبلغ الإجمالي    | number | required
      - تاريخ الاستحقاق    | date | required
      - هل يتكرر شهرياً؟  | checkbox (is_recurring)
      - وصف / ملاحظات      | textarea
    submit_label: إضافة الالتزام
    api: POST /api/obligations

  modal-pay-obligation:
    title: 💳 تسجيل دفعة
    fields:
      - الالتزام        | text | disabled (auto-filled)
      - المتبقي الحالي  | text | disabled (auto)
      - مبلغ الدفعة     | number | required
      - طريقة الدفع     | select: نقداً / تحويل / شيك | required
      - تاريخ الدفع     | date | required (اليوم تلقائياً)
      - ملاحظات         | textarea
    submit_label: تأكيد الدفع
    api: POST /api/obligations/{id}/pay
    on_success: toast "تم تسجيل الدفعة — المتبقي: X دج"

  modal-obligation-payments:
    title: 📋 سجل دفعات الالتزام
    content: جدول: التاريخ | المبلغ | الطريقة | المسجّل

STATE_MACHINE:
  states: [active, partial, settled, overdue]
  transitions:
    - active → partial  (دفعة جزئية)
    - partial → settled (اكتمال السداد)
    - active/partial → overdue (تجاوز تاريخ الاستحقاق)

API_ENDPOINTS:
  - GET    /api/obligations?page=&status=&type=
  - POST   /api/obligations
  - PATCH  /api/obligations/{id}
  - POST   /api/obligations/{id}/pay
  - GET    /api/obligations/{id}/payments

NOTES:
  - الالتزامات المتكررة (is_recurring): تُنشأ تلقائياً كل شهر
  - تنبيه تلقائي قبل 7 أيام من الاستحقاق (إشعار في الـ header)
  - عرض صف بلون خلفية أحمر خفيف إن كان overdue
```

---

## 15 — 💵 cash-handovers — تسليم العهدة النقدية

```
PAGE_ID: cash-handovers
PAGE_TITLE: 💵 تسليم العهدة النقدية
PAGE_SUBTITLE: إقفال الصندوق اليومي — Clôture de Caisse

HEADER_ACTIONS:
  - إقفال الصندوق اليوم | btn-primary | openModal('modal-cash-close')

SPECIAL_COMPONENTS:
  - بطاقة "ملخص اليوم" (Card كبيرة في أعلى الصفحة):
    يجلب البيانات من: GET /api/cash-handovers/today-summary
    يعرض:
      - إجمالي المستلم (total_received) — أخضر
      - إجمالي المصروف (total_paid) — أحمر
      - الرصيد المتوقع (expected_balance = received - paid) — أزرق Bold
      - مؤشر حالة: "مُقفَل اليوم ✓" badge أخضر أو "لم يُقفَل بعد ⚠️" badge أحمر
    في حال لم تُوجد بيانات: skeleton loading ثم عرض 0 دج

TABLE — سجل الإقفالات السابقة:
  id: handovers-table
  columns:
    - التاريخ           | text
    - الرصيد المتوقع    | text
    - الرصيد الفعلي     | text
    - الفرق (variance)  | text ملوّن:
                            أخضر إن = 0
                            أحمر إن سالب (عجز)
                            برتقالي إن موجب (زيادة)
    - المعتمِد          | avatar + اسم
    - الحالة            | badge: معتمد(success) / معلق(warning)
    - الإجراءات         | عرض التفاصيل
  pagination: true

MODALS:
  modal-cash-close:
    title: 🔒 إقفال الصندوق اليومي
    content:
      - قسم "ملخص الحركات اليومية" (readonly):
          * إجمالي المستلم | text disabled
          * إجمالي المصروف | text disabled
          * الرصيد المتوقع | text disabled Bold
      - فاصل بصري (hr)
      - قسم "الفعلي":
          * الرصيد الفعلي المعدود | number | required
          * الفرق (variance)      | text | readonly | يُحسب JS تلقائياً
            لون تلقائي: أخضر=0 | أحمر<0 | برتقالي>0
            تحذير إن |variance| > 500: "⚠️ فارق كبير، تأكد من العد"
          * ملاحظات | textarea
    submit_label: اعتماد الإقفال
    submit_type: primary
    api: POST /api/cash-handovers
    validation: لا يمكن إقفال مرتين في نفس اليوم

  modal-handover-detail:
    title: 📋 تفاصيل إقفال الصندوق
    content:
      - التاريخ + المعتمِد
      - الرصيد المتوقع vs الفعلي
      - الفرق مع تحليل (surplus / deficit)
      - الملاحظات
      - سجل الحركات المالية ليوم الإقفال:
          قائمة: الوقت + النوع (رسوم/مصروف) + المبلغ + المسجّل

API_ENDPOINTS:
  - GET    /api/cash-handovers?page=&branch=&from=&to=
  - GET    /api/cash-handovers/today-summary
  - POST   /api/cash-handovers
  - GET    /api/cash-handovers/{id}

NOTES:
  - variance = actual_balance - expected_balance
    * variance > 0 = زيادة نقدية (surplus)
    * variance < 0 = عجز نقدي (deficit)
  - يُحسب variance JavaScript-side لحظياً عند الكتابة
  - today-summary يجمع: جميع الـ payments + handovers الصادرة ليوم الإقفال
  - إن تم الإقفال: زر "إقفال الصندوق اليوم" يصبح disabled مع badge "مُقفَل ✓"
  - admin فقط يمكنه تعديل إقفال تم (override)
```

---

## 16 — 📢 notifications — مركز الإرسال الجماعي

```
PAGE_ID: notifications
PAGE_TITLE: 📢 مركز الإرسال الجماعي
PAGE_SUBTITLE: إرسال إشعارات جماعية للمعلمين وأولياء الأمور والطلاب

HEADER_ACTIONS:
  - إرسال إشعار جماعي | btn-primary | openModal('modal-broadcast')

KPI_CARDS:
  - 48   | إشعار أُرسل هذا الشهر   | blue
  - 1,247 | إجمالي المستلمين        | green
  - 12   | إشعار اليوم              | orange
  - 98%  | معدل التسليم             | gray

TABS:
  - كل الإشعارات
  - اليوم
  - الأسبوع الماضي
  - الشهر

FILTERS:
  - search: "بحث في عنوان الإشعار"
  - select: الفئة المستهدفة [الكل | أولياء أمور | معلمون | طلاب | الجميع]
  - date range: من / إلى

TABLE — سجل الإشعارات المرسلة:
  id: notifications-table
  columns:
    - التاريخ والوقت    | text (sent_at)
    - العنوان           | text (title) Bold
    - الفئة المستهدفة  | badge ملوّن:
                          أولياء أمور(orange) معلمون(blue) الجميع(green)
    - الفصل المستهدف   | text (إن كان محدداً) — col-hide-mobile
    - عدد المستلمين    | text (recipients_count)
    - المُرسِل          | avatar + اسم
    - الإجراءات        | عرض النص | إعادة إرسال
  pagination: true

MODALS:
  modal-broadcast:
    title: 📢 إرسال إشعار جماعي
    fields:
      - الفئة المستهدفة | select: أولياء أمور فصل محدد / كل أولياء الأمور / كل المعلمين / الجميع | required
      - إن "أولياء أمور فصل محدد":
          select إضافي: اختر الفصل | required
      - عنوان الإشعار  | text | required
      - نص الإشعار     | textarea | required
      - أهمية عالية؟  | checkbox (is_urgent) — يضيف لون أحمر للإشعار
    submit_label: إرسال الآن
    submit_type: primary
    api: POST /api/notifications/broadcast
    on_success: toast "تم الإرسال لـ X مستلماً بنجاح"

  modal-notification-detail:
    title: 📋 تفاصيل الإشعار
    content:
      - العنوان + التاريخ + المُرسِل
      - الفئة المستهدفة
      - نص الإشعار الكامل
      - إحصائيات: عدد المستلمين / تم القراءة / لم يُقرأ
      - زر "إعادة إرسال"

API_ENDPOINTS:
  - GET    /api/notifications?page=&target=&from=&to=
  - POST   /api/notifications/broadcast
  - GET    /api/notifications/{id}
  - POST   /api/notifications/{id}/resend

NOTES:
  - الإشعار العاجل (is_urgent): يظهر باللون الأحمر في لائحة المستلمين
  - recipients_count يُحسب من قاعدة البيانات حسب الفئة المختارة
  - عرض preview للمستلمين قبل الإرسال: "سيُرسَل لـ X شخص"
  - إعادة الإرسال = POST نسخة جديدة بنفس المحتوى
```

---

*آخر تحديث: مارس 2026 — School ERP v2.0*
*الملفات الجاهزة بعد هذا القالب: جميع الـ 25 صفحة*
