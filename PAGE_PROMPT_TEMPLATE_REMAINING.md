# 📄 PAGE PROMPT TEMPLATE — School ERP v2.0
## القالب الموحد الكامل لجميع الـ 25 صفحة — مُصحَّح ومُكتمَل

> **قاعدة البيانات المرجعية:** مرفقة في `database.wsd`
> **الصفحات المنفذة:** `dashboard`, `students`
> **الصفحات المتبقية للتنفيذ:** 23 صفحة

---

## ⚡ كيف تستخدم هذا القالب

1. **انسخ الـ SECTION PROMPT** الخاص بالصفحة التي تريدها
2. **أرسله لـ Claude** مع التعليمة: `"أنشئ هذه الصفحة كـ HTML جاهز"`
3. **الناتج** يُوضع داخل `<div class="page" id="page-XXX">` في `index.html`
   أو في ملف منفصل `sections/XXX.html` إن كان النظام يستخدم lazy loading
4. **الـ Modals** الخاصة تُضاف بعد `<!-- GLOBAL MODALS -->` في `index.html`

---

## 🏗️ ما يُورَث تلقائياً (لا تذكره في الـ prompt)

```
✅ Sidebar + Navigation        ← من layout.js
✅ Top Header + Breadcrumb     ← من layout.js
✅ Theme (Dark/Light Toggle)   ← من layout.js
✅ Toast Notifications         ← showToast('رسالة', 'success|error|info|warning')
✅ Modal System                ← openModal('id') / closeModal('id')
✅ Design System (CSS vars)    ← من style.css
✅ Typography + RTL            ← من style.css
✅ Responsive Layout           ← من style.css

مكونات CSS جاهزة للاستخدام المباشر:
  .kpi-card .kpi-grid          ← KPI Cards
  .card .card-header .card-body← بطاقات المحتوى
  .data-table .table-wrapper   ← الجداول
  .badge badge-success/warning/danger/info/gray ← الشارات اللونية
  .btn btn-primary/ghost/accent/danger ← الأزرار
  .form-input .form-select .form-textarea ← حقول النماذج
  .modal .modal-overlay .modal-footer ← النوافذ المنبثقة
  .tabs .tab-btn               ← التبويبات
  .pagination .page-btn        ← التصفح
  .alert-item .alert-list      ← التنبيهات
  .progress-bar-wrap .progress-bar-track .progress-bar-fill ← شرائط التقدم
  .search-input-wrap .search-input ← حقل البحث
  .action-btns .action-btn.view/.edit/.delete ← أزرار الإجراءات
  .avatar .avatar-green/.blue/.orange/.purple ← صور الأشخاص
  .form-row .form-group .form-label .form-hint ← تخطيط النموذج
  .empty-state                 ← حالة "لا توجد بيانات"
  .toggle-switch               ← مفتاح تبديل inline
  .page-header-row .page-header .page-title .page-subtitle ← header الصفحة
  .table-controls .filter-select ← شريط الفلترة
```

---

## 📐 هيكل الـ Prompt المعياري

```
PAGE_ID: [id الصفحة — يطابق data-page="xxx" في Sidebar]
PAGE_TITLE: [العنوان مع الإيموجي]
PAGE_SUBTITLE: [وصف مختصر]

DB_TABLES: [جداول قاعدة البيانات المستخدمة في هذه الصفحة]

HEADER_ACTIONS:
  - [نص الزر | class الزر | الإجراء عند النقر]

KPI_CARDS: (اختياري)
  - [القيمة | الوصف | اللون: green/blue/orange/red/gray]

FILTERS:
  - [search | select: الخيارات | date | date-range]

TABLE:
  id: [table-id]
  columns: [العمود | نوعه: text/badge/avatar+text/toggle/actions/progress]
  row_coloring: [شرط تلوين الصف — اختياري]
  pagination: true/false

TABS: (اختياري)
  - [اسم التبويب | قيمة فلترة]

MODALS:
  [modal-id]:
    title: [العنوان]
    fields:
      - [الحقل | النوع | placeholder/قيم | required/optional/disabled]
    submit_label: [نص زر الحفظ]
    submit_type: primary/accent/danger
    api: [METHOD /api/endpoint]
    on_success: [showToast('...','success')]

SPECIAL_COMPONENTS: (اختياري)
  - [وصف مفصّل للمكون الخاص]

STATE_MACHINE: (اختياري)
  states: [الحالات]
  transitions: [الانتقالات بالشكل: from → to (الشرط)]

API_ENDPOINTS:
  - GET    /api/[endpoint]?[params]   ← قراءة + فلترة
  - POST   /api/[endpoint]            ← إنشاء
  - PATCH  /api/[endpoint]/{id}       ← تعديل
  - PATCH  /api/[endpoint]/{id}/[action] ← إجراء خاص
  - DELETE /api/[endpoint]/{id}       ← حذف ناعم (soft delete)

NOTES:
  - [ملاحظات خاصة بالصفحة]
```

---

## 🗂️ فهرس الصفحات الـ 25

| # | PAGE_ID | الصفحة | الجداول الرئيسية |
|---|---------|--------|-----------------|
| 1 | dashboard | لوحة القيادة | students, payments, expenses, attendance |
| 2 | students | قاعدة الطلاب | students, users, parents, classes, financial_policies |
| 3 | fees | الرسوم والتحصيل | student_fees, payments |
| 4 | payrolls | الرواتب | payrolls, users |
| 5 | expenses | المصروفات | expenses |
| 6 | attendance | الحضور والغياب | attendance, students, academic_years |
| 7 | inventory | كتالوج المخزون | inventory_items, inventory_logs |
| 8 | messages | صندوق الرسائل | conversations, messages, conversation_participants |
| 9 | users | إدارة المستخدمين | users, roles, permissions, user_permissions |
| 10 | enrollments | طلبات التسجيل | student_enrollments, students, classes, programs |
| 11 | schedules | الجداول الدراسية | schedules, teacher_assignments |
| 12 | branches | الفروع | branches |
| 13 | academic-years | السنوات الدراسية | academic_years |
| 14 | financial-policies | السياسات المالية | financial_policies, students |
| 15 | system-logs | سجلات النظام | system_logs, users |
| 16 | teachers | المعلمون | teachers, users, teacher_assignments |
| 17 | parents | أولياء الأمور | parents, users, students, student_fees |
| 18 | programs | البرامج والمواد | programs, subjects |
| 19 | classes | الفصول الدراسية | classes, students, branches |
| 20 | assignments | إسناد المهام | teacher_assignments, teachers, subjects, classes |
| 21 | grades | الدرجات | grades, assessments, students, teacher_assignments |
| 22 | stock-actions | حركة المخزون | inventory_logs, inventory_items |
| 23 | consumptions | الاستهلاك اليومي | daily_consumptions, branches |
| 24 | obligations | الالتزامات الخارجية | external_obligations, branches |
| 25 | cash-handovers | تسليم العهدة النقدية | cash_handovers, branches |
| 26 | notifications | مركز الإشعارات | notifications, users |

---

## 📋 PROMPTS الكاملة لكل صفحة

---

### 💰 fees — رسوم الطلاب والتحصيل

```
PAGE_ID: fees
PAGE_TITLE: 💰 رسوم الطلاب والتحصيل
PAGE_SUBTITLE: متابعة الفواتير والمدفوعات والديون المتأخرة

DB_TABLES: student_fees (id, student_id, academic_year_id, program_id, fee_type,
           amount_due, applied_discount, is_previous_debt, due_date)
           payments (id, fee_id, amount_paid, installment_number, payment_date,
           payment_method, receipt_number)

HEADER_ACTIONS:
  - تصدير Excel | btn-ghost | Layout.exportTable('fees-table','fees.csv')
  - تصدير PDF   | btn-ghost
  - تحصيل دفعة  | btn-accent | openModal('modal-payment')

KPI_CARDS:
  - 148,000 دج | إجمالي الإيرادات الشهر  | green
  - 32,500 دج  | الديون المتأخرة          | red
  - 12 طالب    | لديهم فواتير معلقة       | orange
  - 89%        | نسبة التحصيل            | blue

TABS:
  - كل الفواتير     | all
  - متأخرة (overdue) | overdue
  - مدفوعة          | paid
  - جزئية           | partial

FILTERS:
  - search: "بحث بالاسم أو رقم الفاتورة"
  - select: جميع الفصول (يُملأ من جدول classes)
  - date-range: من / إلى (due_date)
  - select: طريقة الدفع [كل الطرق | نقداً | بطاقة | تحويل]

TABLE:
  id: fees-table
  columns:
    - رقم الفاتورة   | text — receipt_number
    - الطالب         | avatar + اسم + #رقم
    - الفصل          | text — class_name
    - المبلغ الإجمالي | text — amount_due
    - المدفوع         | text — SUM(payments.amount_paid)
    - المتبقي         | text ملوّن بالأحمر إن > 0
    - تاريخ الاستحقاق | text + badge: أحمر إن past due_date
    - طريقة الدفع     | badge
    - الحالة          | badge-success(مدفوع)/badge-warning(جزئي)/badge-danger(متأخر)/badge-info(معلق)
    - الإجراءات       | عرض إيصال | تحصيل دفعة جديدة
  row_coloring: خلفية warning-tint إن الحالة=overdue
  pagination: true

SPECIAL_COMPONENTS:
  - progress bar أفقي داخل كل صف يُمثّل (amount_paid / amount_due * 100)

MODALS:
  modal-payment:
    title: 💳 معالجة الدفع
    fields:
      - بحث عن الطالب   | search-input | ابحث بالاسم أو الرقم... | required
      - المبلغ الإجمالي  | text | disabled (auto من student_fees.amount_due)
      - المدفوع مسبقاً   | text | disabled (auto SUM payments)
      - المبلغ المدفوع الآن | number | 0.00 | required
      - طريقة الدفع      | select: نقداً / بطاقة / تحويل بنكي | required
      - ملاحظات          | text | اختياري
    submit_label: تحصيل وإصدار إيصال PDF
    submit_type: accent
    api: POST /api/payments
    on_success: showToast('تم التحصيل وإصدار الإيصال #REC-YYYY-XXXXX','success')

  modal-receipt-view:
    title: 🧾 عرض الإيصال
    content: عرض بيانات الدفعة: رقم الإيصال، الطالب، التاريخ، المبلغ، الطريقة
    submit_label: طباعة / تحميل PDF
    api: GET /api/payments/{id}/receipt

STATE_MACHINE:
  states: [pending, partial, paid, overdue]
  transitions:
    - pending → partial  (عند دفع جزئي: amount_paid < amount_due)
    - partial → paid     (عند دفع كامل: SUM(payments) >= amount_due)
    - pending/partial → overdue (عند تجاوز due_date بدون سداد كامل)

API_ENDPOINTS:
  - GET    /api/fees?page=&status=&class_id=&from=&to=&method=
  - GET    /api/fees/{id}
  - POST   /api/payments   (receipt_number: REC-YYYY-XXXXX auto)
  - GET    /api/payments/{id}/receipt  (PDF blob)

NOTES:
  - receipt_number يُولَّد تلقائياً: REC-{YYYY}-{XXXXX}
  - الفواتير المتأخرة: لون خلفية الصف تحذيري
  - المتبقي = amount_due - applied_discount - SUM(payments.amount_paid)
  - زر "تحصيل دفعة" في صف الجدول يفتح modal-payment مع تعبئة بيانات الطالب مسبقاً
```

---

### 💼 payrolls — إدارة الرواتب

```
PAGE_ID: payrolls
PAGE_TITLE: 💼 إدارة الرواتب
PAGE_SUBTITLE: رواتب الموظفين والمعلمين وإصدار قسائم الراتب

DB_TABLES: payrolls (id, user_id, branch_id, program_id, month_name,
           calculation_method, sessions_count, students_count, unit_rate,
           base_salary, bonuses, advances, deductions, previous_arrears,
           net_salary, payment_date, status)
           users (id, full_name, role_id)

HEADER_ACTIONS:
  - تصدير Excel        | btn-ghost
  - إنشاء رواتب الشهر | btn-primary | openModal('modal-create-payroll-month')

SPECIAL_COMPONENTS:
  - شريط اختيار الشهر والسنة في أعلى الصفحة:
      <select id="month-picker"> + <select id="year-picker">
      القيمة الافتراضية: الشهر الحالي / السنة الحالية
      عند التغيير: يُعيد جلب البيانات بـ GET /api/payrolls?month=&year=

KPI_CARDS:
  - 185,000 دج | إجمالي رواتب الشهر | blue
  - 120,000 دج | المدفوع حتى الآن   | green
  - 65,000 دج  | المتبقي             | orange
  - 12 موظف    | إجمالي الموظفين    | gray

TABLE:
  id: payrolls-table
  columns:
    - الموظف         | avatar + الاسم + الدور (role_name)
    - الراتب الأساسي | text — base_salary
    - المكافآت       | text — bonuses
    - السلف          | text ملوّن بالأحمر — advances
    - الخصومات       | text ملوّن بالأحمر — deductions
    - عدد الحصص      | text — sessions_count
    - صافي الراتب    | text Bold أخضر — net_salary
    - الحالة         | badge-warning(معلق) / badge-success(مدفوع)
    - الإجراءات:
        * "تحويل لمدفوع" — يظهر فقط إن status=pending → PATCH /api/payrolls/{id}/mark-paid
        * "طباعة Payslip" — GET /api/payrolls/{id}/payslip (PDF)
  pagination: true

MODALS:
  modal-create-payroll-month:
    title: 📅 إنشاء رواتب الشهر
    fields:
      - الشهر | select: يناير...ديسمبر | required
      - السنة | select: 2024/2025/2026 | required
    submit_label: إنشاء الرواتب
    submit_type: primary
    api: POST /api/payrolls/generate-month
    on_success: showToast('تم إنشاء رواتب الشهر لكل الموظفين','success')

  modal-payroll-detail:
    title: 🧾 تفاصيل وتعديل الراتب
    fields:
      - الموظف          | text | disabled (auto)
      - طريقة الحساب    | select: راتب ثابت / حسب الحصص / حسب الطلاب | required
      - الراتب الأساسي  | number | required
      - عدد الحصص       | number | 0 — يُعرض إن method=sessions
      - معدل الحصة      | number | 0 — يُعرض إن method=sessions
      - المكافآت        | number | 0
      - السلف المخصومة  | number | 0
      - الخصومات الأخرى | number | 0
      - المتأخرات السابقة | number | 0 — previous_arrears
      - صافي الراتب     | text | readonly | يُحسب JS تلقائياً
        (= base_salary + bonuses - advances - deductions + previous_arrears)
    submit_label: حفظ وإصدار Payslip
    submit_type: primary
    api: PATCH /api/payrolls/{id}

API_ENDPOINTS:
  - GET    /api/payrolls?month=&year=&branch=
  - POST   /api/payrolls/generate-month
  - PATCH  /api/payrolls/{id}
  - PATCH  /api/payrolls/{id}/mark-paid
  - GET    /api/payrolls/{id}/payslip  (PDF blob)

NOTES:
  - net_salary = base_salary + bonuses - advances - deductions + previous_arrears
    يُحسب JS-side عند أي تغيير في الحقول
  - الراتب المدفوع (status=paid): حقوله readonly — لا يمكن تعديله
  - payslip PDF يحتوي: اسم الموظف، الشهر، تفصيل البنود، صافي الراتب، التوقيع
  - calculation_method: fixed (راتب ثابت) / per_session (× sessions_count × unit_rate) / per_student (× students_count × unit_rate)
```

---

### 📋 expenses — المصروفات التشغيلية

```
PAGE_ID: expenses
PAGE_TITLE: 📋 المصروفات التشغيلية
PAGE_SUBTITLE: متابعة واعتماد المصروفات اليومية

DB_TABLES: expenses (id, branch_id, amount, category, description, expense_date,
           created_by)
           users (id, full_name) — للـ created_by

HEADER_ACTIONS:
  - تصدير Excel   | btn-ghost
  - إضافة مصروف  | btn-primary | openModal('modal-add-expense')

KPI_CARDS:
  - 47,500 دج | إجمالي المصروفات الشهر | red
  - 8         | قيد الانتظار            | orange
  - 31,200 دج | معتمدة                  | green
  - 5,800 دج  | مرفوضة                  | gray

TABS:
  - كل المصروفات | all
  - قيد الانتظار  | pending
  - معتمدة        | approved
  - مرفوضة        | rejected

FILTERS:
  - search: "بحث بالوصف أو الفئة"
  - select: الفئة [الكل | مستلزمات مكتبية | صيانة | كهرباء | وجبات | أخرى]
  - date-range: من / إلى (expense_date)
  - select: الفرع

TABLE:
  id: expenses-table
  columns:
    - التاريخ     | text — expense_date
    - الوصف       | text — description
    - الفئة       | badge ملوّن — category
    - المبلغ      | text Bold — amount
    - الفرع       | text — branch_name
    - المُسجِّل   | avatar + اسم — created_by → users.full_name
    - الفاتورة    | أيقونة مرفق إن attached
    - الحالة      | badge-warning(معلق)/badge-success(معتمد)/badge-danger(مرفوض)
    - الإجراءات   | اعتماد ✓ (إن pending) | رفض ✗ (إن pending) | عرض
  row_coloring: خلفية success-tint إن approved | danger-tint إن rejected
  pagination: true

MODALS:
  modal-add-expense:
    title: 📋 إضافة مصروف جديد
    fields:
      - وصف المصروف  | text | مثال: شراء أقلام | required
      - الفئة        | select: مستلزمات مكتبية/صيانة/كهرباء وماء/وجبات/رواتب/أخرى | required
      - المبلغ (دج)  | number | 0.00 | required
      - التاريخ      | date | اليوم تلقائياً | required
      - الفرع        | select (من branches) | required
      - إرفاق فاتورة | file (PDF/صورة) | اختياري
      - ملاحظات      | textarea | اختياري
    submit_label: إرسال للاعتماد
    submit_type: primary
    api: POST /api/expenses

  modal-reject-expense:
    title: ✗ رفض المصروف
    fields:
      - سبب الرفض | textarea | required
    submit_label: تأكيد الرفض
    submit_type: danger
    api: PATCH /api/expenses/{id}/reject

STATE_MACHINE:
  states: [pending, approved, rejected]
  transitions:
    - pending → approved (اعتماد المسؤول)
    - pending → rejected (رفض مع سبب)
    - rejected → pending (إعادة تقديم — اختياري)

API_ENDPOINTS:
  - GET    /api/expenses?page=&status=&category=&branch=&from=&to=
  - POST   /api/expenses
  - PATCH  /api/expenses/{id}/approve
  - PATCH  /api/expenses/{id}/reject  (body: { reason })
  - DELETE /api/expenses/{id}

NOTES:
  - المبلغ الكلي في KPI يشمل المعتمدة فقط
  - الاعتماد/الرفض لا يحتاج modal — inline مع toast تأكيد
  - سجل الاعتماد: approved_by + approved_at (يمكن إضافته للجدول)
```

---

### ✅ attendance — مراقبة الحضور والغياب

```
PAGE_ID: attendance
PAGE_TITLE: ✅ مراقبة الحضور والغياب
PAGE_SUBTITLE: تسجيل ومتابعة الحضور اليومي للطلاب

DB_TABLES: attendance (id, student_id, academic_year_id, date, status,
           is_justified, justification_reason)
           students (id, user_id, class_id) — للعلاقة
           users (id, full_name) — للاسم
           classes (id, class_name) — للفصل
           academic_years (id, year_name, is_current)

HEADER_ACTIONS:
  - تصدير تقرير  | btn-ghost
  - تسجيل غياب  | btn-primary | openModal('modal-mark-attendance')

KPI_CARDS:
  - 92%  | معدل الحضور اليوم   | green
  - 38   | غائباً اليوم        | red
  - 12   | غياب غير مبرر       | orange
  - 8    | تحذيرات غياب مفرط   | blue

SPECIAL_COMPONENTS:
  - شريط اختيار: [الفصل الدراسي (select)] + [التاريخ (date input, اليوم افتراضياً)]
    عند التغيير: يُعيد عرض الجدول

  - شريط الإحصائيات اليومي (summary bar):
      حاضر X | غائب Y | متأخر Z — مع progress bar أفقي بألوان

TABS:
  - اليوم      | today
  - هذا الأسبوع | week
  - هذا الشهر   | month
  - تقارير الغياب المتكرر | repeat

TABLE:
  id: attendance-table
  columns:
    - الطالب       | avatar + الاسم + #رقم
    - الفصل        | text
    - الحالة       | badge:
                      حاضر(success) / غائب(danger) / متأخر(warning) / إجازة(info)
    - مبرر؟        | badge-success(مبرر) / badge-gray(غير مبرر) — إن كان غائباً
    - سبب الغياب   | text (justification_reason) أو "—"
    - الإجراءات    | تبرير | تعديل
  pagination: true

MODALS:
  modal-mark-attendance:
    title: ✅ تسجيل الحضور
    content:
      - اختيار الفصل | select | required
      - التاريخ      | date | اليوم | required
      - جدول ديناميكي بأسماء طلاب الفصل المختار:
          [checkbox حاضر | الاسم | dropdown: حاضر/غائب/متأخر/إجازة]
      - زر "تحديد الكل حاضر" — convenience
    submit_label: حفظ الحضور
    api: POST /api/attendance/bulk

  modal-justify-absence:
    title: 📝 تبرير الغياب
    fields:
      - الطالب       | text | disabled (auto)
      - التاريخ      | text | disabled (auto)
      - سبب التبرير  | textarea | required
    submit_label: حفظ التبرير
    api: PATCH /api/attendance/{id}/justify

API_ENDPOINTS:
  - GET    /api/attendance?class_id=&date=&from=&to=&academic_year_id=
  - POST   /api/attendance/bulk  (body: [{ student_id, date, status }])
  - PATCH  /api/attendance/{id}/justify  (body: { justification_reason })
  - GET    /api/attendance/report?student_id=  ← تقرير غياب طالب

NOTES:
  - غياب > 3 مرات/أسبوع: تنبيه تلقائي لولي الأمر
  - "تقارير الغياب المتكرر" تبويب: قائمة الطلاب مرتبة بعدد الغيابات (الأكثر أولاً)
  - POST /bulk يقبل مصفوفة لكل طلاب الفصل دفعة واحدة
  - حماية: لا يمكن تسجيل حضور بتاريخ مستقبلي
```

---

### 📦 inventory — كتالوج المخزون

```
PAGE_ID: inventory
PAGE_TITLE: 📦 كتالوج المخزون
PAGE_SUBTITLE: إدارة الأصناف والمخزون والتنبيهات

DB_TABLES: inventory_items (id, item_name, category, quantity_in_stock,
           unit_price, local_currency_price, reorder_level)
           inventory_logs (id, item_id, quantity, action_type, reference_id, action_date)

HEADER_ACTIONS:
  - تصدير Excel   | btn-ghost
  - صنف جديد      | btn-primary | openModal('modal-add-item')

KPI_CARDS:
  - 247  | إجمالي الأصناف        | blue
  - 4    | أصناف نقص حرج         | red
  - 8    | أصناف وصلت للحد الأدنى | orange
  - 89%  | معدل توفر المخزون     | green

TABS:
  - كل الأصناف | all
  - حد أدنى (تنبيه) | low_stock  ← quantity_in_stock <= reorder_level
  - نفد من المخزون  | out_of_stock ← quantity_in_stock = 0

FILTERS:
  - search: "بحث باسم الصنف"
  - select: الفئة [الكل | مستلزمات مكتبية | مواد غذائية | معدات | أخرى]
  - select: الحالة [الكل | متاح | حد أدنى | نفد]

TABLE:
  id: inventory-table
  columns:
    - الصنف          | text Bold — item_name
    - الفئة          | badge — category
    - الكمية المتاحة | text مع لون تلقائي:
                        أحمر إن quantity=0 | برتقالي إن <= reorder_level | أخضر إن > reorder_level
    - الحد الأدنى    | text — reorder_level
    - سعر الوحدة     | text — unit_price
    - الحالة         | badge-danger(نفد)/badge-warning(منخفض)/badge-success(متاح)
    - الإجراءات:
        * إدخال/إخراج (stock action) | openModal('modal-stock-action')
        * سجل الحركات               | openModal('modal-item-logs')
        * تعديل                      | openModal('modal-edit-item')
  pagination: true

MODALS:
  modal-add-item:
    title: 📦 إضافة صنف جديد
    fields:
      - اسم الصنف       | text | required
      - الفئة           | select: مستلزمات مكتبية/مواد غذائية/معدات/أخرى | required
      - الكمية الابتدائية | number | 0
      - وحدة القياس     | select: قطعة/رزمة/لتر/كغ/علبة | required
      - سعر الوحدة (دج)  | number | required
      - سعر بالعملة المحلية | number | 0 (local_currency_price)
      - حد إعادة الطلب   | number | required
    submit_label: إضافة الصنف
    api: POST /api/inventory

  modal-stock-action:
    title: 🔄 حركة مخزون — [اسم الصنف]
    fields:
      - الصنف          | text | disabled (auto-filled)
      - الرصيد الحالي  | text | disabled (quantity_in_stock)
      - نوع الحركة     | select: إدخال (in) / إخراج (out) | required
      - الكمية         | number | required
        validation: إن out → لا تتجاوز الرصيد الحالي
      - سبب الحركة     | text | required
      - ملاحظات        | textarea | اختياري
    submit_label: تنفيذ الحركة
    api: POST /api/inventory/actions
    on_success: showToast('تم تسجيل الحركة — الرصيد الجديد: X','success')

  modal-item-logs:
    title: 📋 سجل حركات [اسم الصنف]
    content:
      جدول بكل الحركات: التاريخ | نوع الحركة (badge in/out) | الكمية | السبب | المسجّل
    api: GET /api/inventory/{id}/logs

API_ENDPOINTS:
  - GET    /api/inventory?page=&category=&level=
  - POST   /api/inventory
  - PATCH  /api/inventory/{id}
  - POST   /api/inventory/actions  (body: { item_id, action_type, quantity, reason })
  - GET    /api/inventory/{id}/logs

NOTES:
  - action_type: 'in' (إدخال) / 'out' (إخراج)
  - بعد حركة out: تحقق تلقائي إن quantity_in_stock <= reorder_level → تنبيه
  - local_currency_price: للبيع من المتجر الداخلي (store_purchases)
```

---

### 💬 messages — صندوق الرسائل

```
PAGE_ID: messages
PAGE_TITLE: 💬 صندوق الرسائل
PAGE_SUBTITLE: التواصل الداخلي مع المعلمين وأولياء الأمور

DB_TABLES: conversations (id, title, type, created_at)
           conversation_participants (conversation_id, user_id, joined_at)
           messages (id, conversation_id, sender_id, message_text,
                    attachment_url, is_read, created_at)

LAYOUT: chat-layout — عمودان لا جدول
  class: "page chat-page" (لضمان height:100%)
  العمود الأيسر (320px fixed): قائمة المحادثات
  العمود الأيمن (flex-1): منطقة الدردشة

HEADER_ACTIONS:
  - رسالة جماعية | btn-primary | openModal('modal-broadcast-msg')

SPECIAL_COMPONENTS:
  عمود المحادثات (يسار):
    - حقل بحث
    - TABS: [فردية (individual) | جماعية (group)]
    - بطاقة محادثة (.conversation-item):
        avatar (أحرف) + الاسم + الدور + آخر رسالة (مقطوعة) + الوقت
        badge عداد غير مقروء (is_read=false count) — يختفي إن 0
        النقر يُحمّل المحادثة في العمود الأيمن + يُعلّم المحادثة active

  منطقة الدردشة (يمين):
    - header المحادثة:
        avatar + الاسم + الدور + نقطة خضراء (online) / رمادية (offline)
    - منطقة الرسائل (.messages-area):
        * فقاعة مُرسَلة (.bubble-sent): يمين، خلفية var(--brand-primary)
        * فقاعة مُستقبَلة (.bubble-received): يسار، خلفية var(--bg-surface-2)
        * مرفق: أيقونة مشبك + اسم الملف قابل للتحميل
        * وقت كل رسالة (created_at مُنسَّق)
    - حقل الإرسال (.compose-area):
        * textarea قابل للتوسع (auto-resize)
        * زر مشبك (file input مخفي) لإرفاق ملف → attachment_url
        * زر إرسال → POST /api/messages

    - حالة "لم تُختر محادثة": empty-state وسط الشاشة

MODALS:
  modal-broadcast-msg:
    title: 📢 رسالة جماعية
    fields:
      - الفئة المستهدفة    | select: أولياء فصل محدد / كل أولياء الأمور / كل المعلمين / الجميع | required
      - الفصل المستهدف     | select (يظهر فقط إن اخترت "أولياء فصل محدد")
      - موضوع المحادثة     | text | required
      - نص الرسالة الأولى  | textarea | required
    submit_label: إرسال للجميع
    submit_type: primary
    api: POST /api/messages/broadcast

API_ENDPOINTS:
  - GET    /api/conversations?type=individual|group
  - GET    /api/conversations/{id}/messages
  - POST   /api/messages  (body: { conversation_id, message_text, attachment_url? })
  - POST   /api/messages/broadcast  (body: { target, class_id?, title, text })
  - PATCH  /api/conversations/{id}/read  ← تعليم كل رسائل المحادثة كمقروءة

NOTES:
  - .chat-page يحتاج CSS خاص: height: calc(100vh - header-height); overflow: hidden
  - الرسائل الجديدة تُضاف JS-side دون reload
  - Enter للإرسال، Shift+Enter لسطر جديد
  - الملف المرفق يُرفع أولاً ثم يُرسل attachment_url في الرسالة
```

---

### 👥 users — إدارة المستخدمين

```
PAGE_ID: users
PAGE_TITLE: 👥 إدارة المستخدمين
PAGE_SUBTITLE: إدارة حسابات المستخدمين وصلاحياتهم

DB_TABLES: users (id, branch_id, role_id, username, email, full_name,
           phone, wallet_balance, is_active, created_at)
           roles (id, role_name, description)
           permissions (id, permission_name, description)
           role_permissions (role_id, permission_id)
           user_permissions (user_id, permission_id, is_granted)

HEADER_ACTIONS:
  - تصدير Excel   | btn-ghost
  - مستخدم جديد  | btn-primary | openModal('modal-add-user')

KPI_CARDS:
  - 3   | مديرون           | blue
  - 18  | معلمون           | green
  - 145 | أولياء أمور       | orange
  - 2   | حسابات موقوفة    | red

FILTERS:
  - search: "بحث بالاسم أو البريد"
  - select: الدور [الكل | مدير | معلم | ولي أمر] — من جدول roles
  - select: الحالة [الكل | نشط | موقوف]
  - select: الفرع

TABLE:
  id: users-table
  columns:
    - المستخدم       | avatar + الاسم + البريد الإلكتروني
    - الدور          | badge ملوّن: مدير(blue) / معلم(green) / ولي أمر(orange)
    - الفرع          | text — branch_name
    - رصيد المحفظة   | text — wallet_balance (إن > 0 أخضر)
    - تاريخ التسجيل  | text — created_at
    - الحالة         | toggle switch (is_active) — inline
    - الإجراءات      | عرض الملف | تعديل | صلاحيات
  pagination: true

MODALS:
  modal-add-user:
    title: 👤 إضافة مستخدم جديد
    fields:
      - الاسم الكامل          | text | required
      - الاسم بالعربية        | text
      - البريد الإلكتروني     | email | required
      - رقم الهاتف            | tel
      - الدور                 | select: من جدول roles | required
      - الفرع                 | select: من جدول branches | required
      - كلمة المرور           | password | required
      - تأكيد كلمة المرور    | password | required
    submit_label: إنشاء الحساب
    api: POST /api/users

  modal-user-permissions:
    title: 🔐 صلاحيات المستخدم
    content:
      - اسم المستخدم + الدور الحالي
      - قسم "صلاحيات الدور الافتراضية": قائمة role_permissions (للقراءة فقط)
      - قسم "صلاحيات إضافية / استثناءات":
          جدول checkboxes لكل permission مع badge "مُضافة" أو "مستثناة"
          يُعدّل جدول user_permissions (is_granted=true/false)
    submit_label: حفظ الصلاحيات
    api: POST /api/users/{id}/permissions

API_ENDPOINTS:
  - GET    /api/users?page=&role=&status=&branch=
  - POST   /api/users
  - PATCH  /api/users/{id}
  - PATCH  /api/users/{id}/toggle   ← تفعيل/تعطيل (is_active)
  - DELETE /api/users/{id}         ← حذف نهائي (admin only)
  - GET    /api/users/{id}/permissions
  - POST   /api/users/{id}/permissions

NOTES:
  - Toggle is_active: inline بدون modal + toast تأكيد
  - لا يمكن حذف مستخدم له بيانات مالية أو أكاديمية مرتبطة
  - عند تعطيل حساب: تظهر رسالة تأكيد
  - wallet_balance تُعدَّل عبر wallet_transactions (جدول منفصل)
```

---

### 📝 enrollments — طلبات التسجيل

```
PAGE_ID: enrollments
PAGE_TITLE: 📝 طلبات التسجيل
PAGE_SUBTITLE: مراجعة والموافقة على طلبات الالتحاق بالبرامج

DB_TABLES: student_enrollments (id, student_id, program_id, academic_year_id,
           group_name, enrollment_date, status, notes)
           students (id, user_id, class_id)
           programs (id, program_name, program_type)
           classes (id, class_name, capacity)
           academic_years (id, year_name, is_current)

HEADER_ACTIONS:
  - تصدير Excel       | btn-ghost
  - طلب تسجيل جديد  | btn-primary | openModal('modal-new-enrollment')

KPI_CARDS:
  - 7  | طلبات معلقة  | orange
  - 23 | مقبولة الشهر | green
  - 3  | مرفوضة       | red
  - 2  | فصول ممتلئة  | blue

TABS:
  - معلقة (pending)   | pending
  - مقبولة            | approved
  - مرفوضة            | rejected
  - كل الطلبات        | all

FILTERS:
  - search: "بحث باسم الطالب"
  - select: الفصل الدراسي
  - select: البرنامج

TABLE:
  id: enrollments-table
  columns:
    - الطالب           | avatar + الاسم + تاريخ الطلب
    - الفصل المطلوب    | text — class_name
    - المقاعد المتاحة  | badge: أخضر(> 0) / أحمر(= 0 ممتلئ)
    - البرنامج         | text — program_name
    - ولي الأمر        | text
    - الحالة           | badge
    - الإجراءات:
        * قبول ✓ (إن pending) → يتحقق من available_seats أولاً
        * رفض ✗ (إن pending) → openModal('modal-reject-enrollment')
        * عرض التفاصيل
  pagination: true

MODALS:
  modal-new-enrollment:
    title: 📝 طلب تسجيل جديد
    fields:
      - الطالب             | select (من students — مع بحث live) | required
      - البرنامج الدراسي   | select (من programs) | required
      - الفصل الدراسي      | select (من classes — يُعرض عدد المقاعد المتاحة) | required
      - السنة الدراسية     | select (الحالية تلقائياً من academic_years.is_current) | required
      - المجموعة (group)   | text | اختياري
      - تاريخ التسجيل المقترح | date
      - ملاحظات            | textarea | اختياري
    submit_label: تقديم الطلب
    api: POST /api/enrollments

  modal-reject-enrollment:
    title: ✗ رفض طلب التسجيل
    fields:
      - سبب الرفض | textarea | required
    submit_label: تأكيد الرفض
    submit_type: danger
    api: PATCH /api/enrollments/{id}/reject

STATE_MACHINE:
  states: [pending, approved, rejected, waitlist]
  transitions:
    - pending → approved  (seats available → creates class assignment)
    - pending → waitlist  (no seats available)
    - pending → rejected  (manual rejection)

API_ENDPOINTS:
  - GET    /api/enrollments?page=&status=&class_id=&program_id=
  - POST   /api/enrollments
  - PATCH  /api/enrollments/{id}/approve  ← triggers checkAvailableSeats
  - PATCH  /api/enrollments/{id}/reject   (body: { reason })
  - GET    /api/classes/{id}/available-seats  ← capacity - enrolled

NOTES:
  - عند القبول: يُتحقق من available_seats أولاً
    إن لا توجد مقاعد: تنبيه "الفصل ممتلئ — هل تريد إضافته لقائمة الانتظار؟"
  - available_seats = classes.capacity - COUNT(approved enrollments)
```

---

### 🗓️ schedules — الجداول الدراسية

```
PAGE_ID: schedules
PAGE_TITLE: 🗓️ الجداول الدراسية
PAGE_SUBTITLE: بناء ومتابعة الجداول الأسبوعية للفصول

DB_TABLES: schedules (id, assignment_id, day_of_week, start_time, end_time, room_number)
           teacher_assignments (id, teacher_id, subject_id, class_id, academic_year_id)
           teachers (id, user_id, specialty)
           subjects (id, subject_name)
           classes (id, class_name)

HEADER_ACTIONS:
  - طباعة الجدول | btn-ghost | GET /api/schedules/{class_id}/print
  - حصة جديدة   | btn-primary | openModal('modal-add-session')

SPECIAL_COMPONENTS:
  - قائمة منسدلة اختيار الفصل (select من جدول classes) — أعلى الصفحة
    عند التغيير: يُعيد رسم الجدول الأسبوعي

  - الجدول الأسبوعي (weekly-grid):
      CSS Grid — 7 أعمدة: [الوقت | الأحد | الاثنين | الثلاثاء | الأربعاء | الخميس | الجمعة]
      8 صفوف للأوقات: 08:00 | 09:00 | 10:00 | 11:00 | 12:00 | 13:00 | 14:00 | 15:00
      كل خلية (cell-slot):
        * محتوى: chip ملوّن يحتوي اسم المادة + اسم المعلم + رقم الغرفة
        * فارغة: أيقونة "+" تظهر عند hover → فتح modal-add-session مع تعبئة اليوم والساعة
        * تعارض: chip أحمر + أيقونة ⚠️
      
      خريطة الألوان: كل مادة لها لون ثابت من palette (10 ألوان CSS vars)

MODALS:
  modal-add-session:
    title: 📅 إضافة حصة دراسية
    fields:
      - الفصل   | select (من classes) | required
      - المادة   | select (تُفلتر حسب teacher_assignments للفصل المختار) | required
      - المعلم   | select (تُفلتر حسب الإسناد للمادة+الفصل) | required
      - اليوم    | select: الأحد/الاثنين/الثلاثاء/الأربعاء/الخميس/الجمعة | required
      - وقت البداية | select: 08:00/09:00/.../15:00 | required
      - وقت النهاية | select: 09:00/10:00/.../16:00 | required
      - رقم الغرفة  | text | اختياري
    submit_label: إضافة الحصة
    api: POST /api/schedules
    on_submit_first: POST /api/schedules/check-conflicts (body: { teacher_id, day_of_week, start_time, end_time })
    on_conflict: تحذير "⚠️ تعارض! المعلم [الاسم] مشغول في هذا الوقت"

API_ENDPOINTS:
  - GET    /api/schedules?class_id=&academic_year_id=
  - POST   /api/schedules
  - POST   /api/schedules/check-conflicts  (body: { teacher_id, day_of_week, start_time, end_time })
  - DELETE /api/schedules/{id}
  - GET    /api/schedules/{class_id}/print  (PDF)

NOTES:
  - تعارض الجدول: نفس المعلم في نفس اليوم والوقت (check by teacher_assignments)
  - حذف حصة: النقر على الـ chip → زر حذف بجانبها
  - الـ chip يُعرض: subject_name + "\n" + teacher_first_name + " • " + room_number
```

---

### 🏢 branches — إدارة الفروع

```
PAGE_ID: branches
PAGE_TITLE: 🏢 إدارة الفروع
PAGE_SUBTITLE: إدارة فروع المدرسة وبياناتها الأساسية

DB_TABLES: branches (id, branch_name, branch_type, location)

HEADER_ACTIONS:
  - فرع جديد | btn-primary | openModal('modal-add-branch')

KPI_CARDS:
  - 3   | إجمالي الفروع   | blue
  - 487 | إجمالي الطلاب   | green
  - 34  | إجمالي الموظفين | orange
  - 2   | فروع رئيسية     | gray

TABLE:
  id: branches-table
  columns:
    - الفرع        | avatar (أحرف اختصار) + اسم الفرع Bold + نوع الفرع
    - الموقع       | text — location
    - عدد الطلاب   | text — (محسوب: COUNT students بهذا الفرع)
    - عدد الموظفين | text — (محسوب: COUNT users بهذا الفرع)
    - النوع        | badge: رئيسي(blue) / فرعي(gray) / مؤقت(orange)
    - الإجراءات    | عرض الإحصائيات | تعديل
  pagination: false

MODALS:
  modal-add-branch:
    title: 🏢 إضافة فرع جديد
    fields:
      - اسم الفرع  | text | مثال: الفرع الرئيسي | required
      - نوع الفرع  | select: رئيسي / فرعي / مؤقت | required
      - الموقع     | textarea | العنوان الكامل | required
    submit_label: إنشاء الفرع
    submit_type: primary
    api: POST /api/branches

  modal-edit-branch:
    title: ✏️ تعديل بيانات الفرع
    fields: نفس modal-add-branch مع تعبئة مسبقة
    submit_label: حفظ التعديلات
    api: PATCH /api/branches/{id}

  modal-branch-stats:
    title: 📊 إحصائيات الفرع
    content:
      - عدد الطلاب + عدد الموظفين + عدد الفصول
      - إيرادات الشهر من هذا الفرع
      - مصروفات الشهر من هذا الفرع

API_ENDPOINTS:
  - GET    /api/branches
  - POST   /api/branches
  - PATCH  /api/branches/{id}
  - GET    /api/branches/{id}/stats   ← students_count, staff_count, revenue, expenses

NOTES:
  - لا يمكن حذف فرع فيه طلاب أو موظفون
  - عند النقر على اسم الفرع: openModal('modal-branch-stats')
  - branch_type من DB: VARCHAR(50) — قيم مقترحة: "رئيسي", "فرعي", "مؤقت"
```

---

### 📅 academic-years — السنوات الدراسية

```
PAGE_ID: academic-years
PAGE_TITLE: 📅 السنوات الدراسية
PAGE_SUBTITLE: إدارة السنوات الدراسية وتفعيلها

DB_TABLES: academic_years (id, year_name, start_date, end_date, is_current)

HEADER_ACTIONS:
  - سنة دراسية جديدة | btn-primary | openModal('modal-add-year')

SPECIAL_COMPONENTS:
  - بطاقة "السنة الحالية النشطة" (card مُميَّزة بلون أخضر + أيقونة ⭐):
      year_name + start_date + end_date
      progress bar: (today - start_date) / (end_date - start_date) * 100
      نص: "X يوم مضى من أصل Y يوم"
      زر "إغلاق السنة الدراسية" → openModal('modal-close-year')

TABLE:
  id: years-table
  columns:
    - السنة الدراسية | text + badge "نشطة" (success) إن is_current = true
    - تاريخ البداية  | text — start_date
    - تاريخ النهاية  | text — end_date
    - المدة (أيام)   | text — محسوب JS: (end_date - start_date) / 86400000
    - عدد الطلاب     | text — COUNT student_enrollments لهذه السنة
    - الحالة         | badge: نشطة(success) / منتهية(gray) / مستقبلية(info)
    - الإجراءات      | عرض الإحصائيات | تعديل | تفعيل (إن لم تكن نشطة)
  pagination: false

MODALS:
  modal-add-year:
    title: 📅 إضافة سنة دراسية
    fields:
      - اسم السنة          | text | مثال: 2025-2026 | required
      - تاريخ البداية      | date | required
      - تاريخ النهاية      | date | required
      - جعلها السنة الحالية | checkbox (is_current) — تحذير إن كانت هناك سنة نشطة
    submit_label: إنشاء السنة
    api: POST /api/academic-years

  modal-close-year:
    title: ⚠️ إغلاق السنة الدراسية
    content: تحذير بالغ: "هذا الإجراء سيُنهي السنة الحالية. يجب أن تكون السنة الجديدة جاهزة."
    fields:
      - تأكيد الإغلاق | checkbox مع نص "أؤكد إغلاق السنة الدراسية" | required
    submit_label: تأكيد الإغلاق
    submit_type: danger
    api: POST /api/academic-years/{id}/close

API_ENDPOINTS:
  - GET    /api/academic-years
  - POST   /api/academic-years
  - PATCH  /api/academic-years/{id}
  - POST   /api/academic-years/{id}/activate  ← جعلها الحالية (is_current=true + ألغِ القديمة)
  - POST   /api/academic-years/{id}/close

NOTES:
  - لا يمكن أن تكون أكثر من سنة واحدة نشطة (is_current=true) في آنٍ واحد
  - عند تفعيل سنة: تُلغى السنة النشطة السابقة تلقائياً مع تحذير
  - progress bar = 0 إن is_current=false
  - status logic: is_current=true → نشطة | end_date < today → منتهية | start_date > today → مستقبلية
```

---

### 📜 financial-policies — السياسات المالية

```
PAGE_ID: financial-policies
PAGE_TITLE: 📜 السياسات المالية
PAGE_SUBTITLE: إدارة سياسات الخصم والتقسيط وربطها بالطلاب

DB_TABLES: financial_policies (id, policy_name, discount_percentage, discount_fixed_amount)
           students (id, policy_id) — للعلاقة

HEADER_ACTIONS:
  - سياسة جديدة | btn-primary | openModal('modal-add-policy')

SPECIAL_COMPONENTS:
  - info alert في أعلى الصفحة:
    "💡 السياسات المالية تُحدد طريقة احتساب الخصومات لكل طالب.
     يمكن ربط كل طالب بسياسة واحدة عند تسجيله أو تعديله."

TABLE:
  id: policies-table
  columns:
    - اسم السياسة       | text Bold — policy_name
    - نسبة الخصم        | text — discount_percentage% (إن > 0)
    - خصم ثابت          | text — discount_fixed_amount دج (إن > 0)
    - عدد الطلاب المرتبطين | text — COUNT students WHERE policy_id = this.id
    - الإجراءات         | عرض الطلاب | تعديل | نسخ
  pagination: false

MODALS:
  modal-add-policy:
    title: 📜 إضافة سياسة مالية
    fields:
      - اسم السياسة         | text | مثال: خصم أسري 20% | required
      - نسبة الخصم (%)      | number | 0 — 100
      - خصم ثابت (دج)       | number | 0
      - الوصف              | textarea | شرح مختصر للسياسة
      - شروط الاستفادة     | textarea | مثال: للعائلات ذات الأبناء المتعددين
    submit_label: حفظ السياسة
    api: POST /api/financial-policies

  modal-policy-students:
    title: 👨‍🎓 الطلاب المرتبطون بالسياسة
    content:
      - اسم السياسة + تفاصيلها
      - جدول الطلاب: الاسم + الفصل + رابط لملف الطالب
    api: GET /api/financial-policies/{id}/students

API_ENDPOINTS:
  - GET    /api/financial-policies
  - POST   /api/financial-policies
  - PATCH  /api/financial-policies/{id}
  - POST   /api/financial-policies/{id}/duplicate  ← نسخ بـ "نسخة من [الاسم]"
  - GET    /api/financial-policies/{id}/students

NOTES:
  - DB Fields: policy_name (VARCHAR 100), discount_percentage (DOUBLE, 0-100),
    discount_fixed_amount (DOUBLE, 0+)
  - النسبة والمبلغ الثابت يمكن استخدامهما معاً (MAX or combiné — حسب منطق الـ backend)
  - لا يمكن حذف سياسة مرتبطة بطلاب — soft delete فقط
  - عند نسخ سياسة: تُنشأ نسخة باسم "نسخة من [policy_name]" مع نفس القيم
```

---

### 🔒 system-logs — سجلات النظام

```
PAGE_ID: system-logs
PAGE_TITLE: 🔒 سجلات النظام
PAGE_SUBTITLE: مراقبة كل الأحداث والتغييرات في النظام

DB_TABLES: system_logs (id, user_id, action, ip_address, log_time)
           users (id, full_name, role_id)

HEADER_ACTIONS:
  - تصدير CSV           | btn-ghost | Layout.exportTable('logs-table','logs.csv')
  - مسح السجلات القديمة | btn-ghost btn-danger-style | openModal('modal-clear-logs')

KPI_CARDS:
  - 1,247 | إجمالي الأحداث اليوم | blue
  - 3     | تحذيرات              | orange
  - 1     | أخطاء                | red
  - 89    | مستخدم نشط الآن      | green

TABS:
  - كل الأحداث           | all
  - تسجيل الدخول/الخروج  | auth
  - إنشاء/تعديل          | create|update
  - حذف                   | delete
  - أخطاء                 | error

FILTERS:
  - search: "بحث بالوصف أو المستخدم"
  - select: المستخدم [الكل | ...]
  - select: نوع الحدث [الكل | auth | create | update | delete | error]
  - date-range: من / إلى
  - select: مستوى الخطورة [الكل | info | warning | error | critical]

TABLE:
  id: logs-table
  columns:
    - الوقت         | text — log_time (كامل مع ثانية، توقيت محلي)
    - المستخدم      | avatar + الاسم + الدور
    - نوع الحدث     | badge: auth(blue)/create(green)/update(orange)/delete(red)/error(danger)
    - الوصف         | text — action (مختصر، كامل عند النقر)
    - عنوان IP      | text monospace — ip_address
    - الإجراءات     | عرض التفاصيل
  row_coloring: خلفية danger-tint إن type=error
  pagination: true

MODALS:
  modal-log-detail:
    title: 🔍 تفاصيل الحدث
    content:
      - الوقت الكامل + المستخدم + IP
      - النوع + الوصف الكامل
      - payload كامل (JSON formatted في pre/code block)

  modal-clear-logs:
    title: ⚠️ مسح السجلات القديمة
    fields:
      - مسح الأقدم من | select: أسبوع / شهر / 3 أشهر / 6 أشهر | required
    submit_label: مسح السجلات
    submit_type: danger
    api: DELETE /api/system-logs/clear?older_than=

API_ENDPOINTS:
  - GET    /api/system-logs?page=&type=&user=&from=&to=&level=
  - GET    /api/system-logs/{id}
  - DELETE /api/system-logs/clear?older_than=

NOTES:
  - الجدول للقراءة فقط — لا تعديل أو حذف فردي
  - النقر على صف يفتح modal-log-detail
  - السجلات مرتبة من الأحدث للأقدم
  - DB: action (VARCHAR 255) يحمل وصف الحدث
```

---

### 👨‍🏫 teachers — إدارة المعلمين

```
PAGE_ID: teachers
PAGE_TITLE: 👨‍🏫 إدارة المعلمين
PAGE_SUBTITLE: ملفات المعلمين وتخصصاتهم وجداولهم

DB_TABLES: teachers (id, user_id, specialty, hire_date)
           users (id, full_name, phone, email, is_active, branch_id)
           teacher_assignments (id, teacher_id, class_id, subject_id, academic_year_id)

HEADER_ACTIONS:
  - تصدير Excel   | btn-ghost
  - معلم جديد     | btn-primary | openModal('modal-add-teacher')

KPI_CARDS:
  - 18  | إجمالي المعلمين  | blue
  - 15  | نشطون            | green
  - 5   | تخصصات مختلفة   | orange
  - 312 | حصة هذا الشهر   | gray

FILTERS:
  - search: "بحث بالاسم أو التخصص"
  - select: التخصص [الكل | رياضيات | لغة عربية | علوم | فيزياء | أخرى]
  - select: الحالة [الكل | نشط | موقوف]

SPECIAL_COMPONENTS:
  - VIEW TOGGLE: زر تبديل بين Card View 🔲 و Table View 📋
    افتراضي: Card View

  Card View — .card-grid (repeat(auto-fill, minmax(240px, 1fr))):
    كل معلم بطاقة (.teacher-card) تحتوي:
      - avatar دائري كبير (أحرف الاسم ملوّنة)
      - الاسم الكامل (Bold)
      - specialty badge ملوّن
      - hire_date: "منذ X سنة" أو التاريخ
      - COUNT(teacher_assignments) فصول مُسندة
      - أزرار: [جدوله ↗] [ملفه 📋]

  Table View:
    id: teachers-table
    columns:
      - المعلم         | avatar + الاسم
      - التخصص         | badge
      - تاريخ التعيين  | text — hire_date
      - الفصول المسندة | text — COUNT assignments
      - الحالة         | toggle switch (is_active من users)
      - الإجراءات      | عرض | تعديل | الجدول

MODALS:
  modal-add-teacher:
    title: 👨‍🏫 إضافة معلم جديد
    fields:
      - الاسم الكامل     | text | required
      - البريد الإلكتروني | email | required
      - رقم الهاتف       | tel
      - التخصص           | text | مثال: رياضيات | required
      - تاريخ التعيين    | date | required
      - الفرع            | select (من branches) | required
      - كلمة المرور      | password | required
    submit_label: إضافة المعلم
    api: POST /api/teachers (creates user record + teacher record)

  modal-teacher-profile:
    title: 📋 ملف المعلم الكامل
    tabs داخلية: [البيانات | الجدول الأسبوعي | آخر الرواتب]
    tab الجدول: mini weekly-grid مضغوط
    tab الرواتب: آخر 3 رواتب في جدول صغير
    size: modal-lg (max-width: 700px)

API_ENDPOINTS:
  - GET    /api/teachers?page=&specialty=&status=
  - POST   /api/teachers
  - PATCH  /api/teachers/{id}
  - PATCH  /api/teachers/{id}/toggle  ← is_active في users
  - GET    /api/teachers/{id}/schedule
  - GET    /api/teachers/{id}/payrolls

NOTES:
  - إضافة معلم = إنشاء user (role=معلم) + teacher record مرتبط
  - عند توقيف معلم: تحذير "لديه X فصل مُسند — هل تريد المتابعة؟"
```

---

### 👨‍👩‍👦 parents — أولياء الأمور

```
PAGE_ID: parents
PAGE_TITLE: 👨‍👩‍👦 أولياء الأمور
PAGE_SUBTITLE: بيانات أولياء الأمور وملفات العائلة

DB_TABLES: parents (id, user_id)
           users (id, full_name, phone, email, address, branch_id)
           students (id, parent_id, user_id, class_id)
           student_fees (id, student_id, amount_due, applied_discount)
           payments (id, fee_id, amount_paid)

HEADER_ACTIONS:
  - تصدير Excel    | btn-ghost
  - ولي أمر جديد  | btn-primary | openModal('modal-add-parent')

KPI_CARDS:
  - 312  | إجمالي أولياء الأمور | blue
  - 28   | لديهم ديون متأخرة    | red
  - 45   | عائلات متعددة الأبناء | orange
  - 890  | دج متوسط المديونية   | gray

FILTERS:
  - search: "بحث بالاسم أو رقم الهاتف"
  - select: الفرع
  - select: الحالة المالية [الكل | لا ديون | ديون متأخرة]

TABLE:
  id: parents-table
  columns:
    - ولي الأمر     | avatar + الاسم + رقم الهاتف
    - عدد الأبناء   | text + أيقونة 👶
    - إجمالي الرسوم | text (SUM fees لكل أبنائه)
    - المدفوع       | text (SUM payments)
    - المتبقي       | text ملوّن أحمر إن > 0
    - الفرع         | text
    - الإجراءات     | ملف العائلة | تواصل
  row_coloring: خلفية warning-tint إن المتبقي > 0
  pagination: true

MODALS:
  modal-add-parent:
    title: 👤 إضافة ولي أمر
    fields:
      - الاسم الكامل      | text | required
      - رقم الهاتف        | tel | required
      - رقم هاتف بديل    | tel | اختياري
      - البريد الإلكتروني | email | اختياري
      - العنوان           | textarea | اختياري
      - الفرع             | select (من branches) | required
      - كلمة المرور       | password | required (لحساب النظام)
    submit_label: إضافة ولي الأمر
    api: POST /api/parents (creates user record + parent record)

  modal-family-profile:
    title: 👨‍👩‍👦 ملف العائلة — [اسم ولي الأمر]
    tabs داخلية:
      [بيانات ولي الأمر | الأبناء | الوضع المالي]

      tab "الأبناء":
        جدول: الاسم + الفصل + الحالة + رابط ملف الطالب

      tab "الوضع المالي":
        - إجمالي الرسوم | المدفوع | المتبقي + progress bar
        - سجل الدفعات: التاريخ + المبلغ + الطريقة
        - زر "إرسال تذكير" → openModal('modal-send-reminder')

  modal-send-reminder:
    title: 📩 إرسال تذكير بالديون
    fields:
      - قناة الإرسال | select: رسالة داخلية / بريد / الاثنان | required
      - نص الرسالة   | textarea | نص افتراضي قابل للتعديل
    submit_label: إرسال
    api: POST /api/parents/{id}/send-reminder

API_ENDPOINTS:
  - GET    /api/parents?page=&status=&branch=
  - POST   /api/parents
  - PATCH  /api/parents/{id}
  - GET    /api/parents/{id}/children
  - GET    /api/parents/{id}/family-balance
  - POST   /api/parents/{id}/send-reminder

NOTES:
  - النقر على صف يفتح modal-family-profile مباشرة
  - family-balance = SUM(student_fees.amount_due - payments.amount_paid) لكل الأبناء
```

---

### 📚 programs — البرامج والمواد الدراسية

```
PAGE_ID: programs
PAGE_TITLE: 📚 البرامج والمواد الدراسية
PAGE_SUBTITLE: إدارة البرامج التعليمية والمواد المرتبطة بها

DB_TABLES: programs (id, branch_id, program_name, program_type, price_cash, price_installments)
           subjects (id, subject_name, description)

HEADER_ACTIONS:
  - برنامج جديد | btn-primary | openModal('modal-add-program')

SPECIAL_COMPONENTS:
  - تخطيط عمودين:
    * العمود الأيسر (35%): قائمة البرامج (.programs-list)
      كل بطاقة (.program-item):
        اسم البرنامج + النوع badge + عدد المواد + السعر
        النقر: يُضيف class active + يعرض مواده في العمود الأيمن
    * العمود الأيمن (65%):
      إن لم يُختر برنامج: empty-state "اختر برنامجاً لعرض موادّه 👈"
      إن اخترت برنامج:
        - card-header: اسم البرنامج + زر "إضافة مادة" + زر "تعديل البرنامج"
        - جدول المواد (subjects)

TABLE (مواد البرنامج — العمود الأيمن):
  id: subjects-table
  columns:
    - اسم المادة   | text Bold — subject_name
    - الوصف        | text مختصر — description
    - الإجراءات    | تعديل | حذف

MODALS:
  modal-add-program:
    title: 📚 إضافة برنامج دراسي
    fields:
      - اسم البرنامج     | text | required
      - نوع البرنامج     | select: تحضيري/ابتدائي/متوسط/ثانوي | required
      - الفرع            | select (من branches) | required
      - السعر نقداً (دج)  | number | required
      - السعر بالتقسيط   | number | required (≥ السعر نقداً)
      - الوصف            | textarea
    submit_label: إنشاء البرنامج
    api: POST /api/programs

  modal-add-subject:
    title: ➕ إضافة مادة دراسية
    fields:
      - اسم المادة | text | required
      - الوصف      | textarea | اختياري
    submit_label: إضافة المادة
    api: POST /api/subjects  (+ ربطها بالبرنامج المختار)

API_ENDPOINTS:
  - GET    /api/programs
  - POST   /api/programs
  - PATCH  /api/programs/{id}
  - DELETE /api/programs/{id}
  - GET    /api/subjects  (or GET /api/programs/{id}/subjects)
  - POST   /api/subjects
  - PATCH  /api/subjects/{id}
  - DELETE /api/subjects/{id}

NOTES:
  - لا يمكن حذف برنامج مرتبط بفصول أو طلاب
  - البرامج والمواد منفصلة في DB: جدول programs + جدول subjects (بدون FK مباشر)
    يمكن إضافة جدول program_subjects لربطهما (محسّن للمستقبل)
  - price_installments validation: يجب أن تكون ≥ price_cash
```

---

### 🏫 classes — إدارة الفصول الدراسية

```
PAGE_ID: classes
PAGE_TITLE: 🏫 إدارة الفصول الدراسية
PAGE_SUBTITLE: مراقبة سعة الفصول والطلاب المسجّلين

DB_TABLES: classes (id, branch_id, class_name, level, age_group, capacity)
           students (id, class_id, status)
           branches (id, branch_name)

HEADER_ACTIONS:
  - فصل جديد | btn-primary | openModal('modal-add-class')

KPI_CARDS:
  - 12  | إجمالي الفصول          | blue
  - 487 | إجمالي الطلاب المسجلين  | green
  - 3   | فصول ممتلئة             | red
  - 41  | مقعد شاغر               | orange

FILTERS:
  - select: المستوى [الكل | مستوى أول | ثاني | ثالث | رابع | خامس]
  - select: الفرع
  - select: الحالة [الكل | متاح | ممتلئ]

SPECIAL_COMPONENTS:
  - Card Grid افتراضي — repeat(auto-fill, minmax(220px, 1fr)):
    كل فصل (.class-card):
      - اسم الفصل (Bold كبير)
      - المستوى (text مُعتم)
      - الفرع (text صغير)
      - badge السعة:
          أخضر إن enrolled < capacity * 0.7
          برتقالي إن capacity * 0.7 ≤ enrolled < capacity
          أحمر + "ممتلئ 🔴" إن enrolled ≥ capacity
      - progress bar: enrolled / capacity
      - نص: "X / Y مقعد"
      - أزرار: [قائمة الطلاب 👨‍🎓] [تعديل ✏️]

MODALS:
  modal-add-class:
    title: 🏫 إضافة فصل جديد
    fields:
      - اسم الفصل           | text | مثال: 3B | required
      - المستوى الدراسي     | select: مستوى أول/ثاني/ثالث/رابع/خامس | required
      - الفئة العمرية (age_group) | text | مثال: 8-10 سنوات | اختياري
      - الفرع               | select (من branches) | required
      - الطاقة الاستيعابية  | number | required
    submit_label: إنشاء الفصل
    api: POST /api/classes

  modal-class-students:
    title: 👨‍🎓 طلاب الفصل — [اسم الفصل]
    content:
      - اسم الفصل + عداد الطلاب
      - جدول: الاسم + #رقم + الحالة + رابط للملف
      - زر "تصدير القائمة"
    api: GET /api/classes/{id}/students

API_ENDPOINTS:
  - GET    /api/classes?page=&level=&branch=&status=
  - POST   /api/classes
  - PATCH  /api/classes/{id}
  - DELETE /api/classes/{id}  ← soft delete إن كان الفصل فارغاً
  - GET    /api/classes/{id}/students
  - GET    /api/classes/{id}/available-seats  ← capacity - COUNT(active students)

NOTES:
  - لا يمكن حذف فصل فيه طلاب (نشطون)
  - level: VARCHAR(50) — قيم مقترحة: "مستوى أول", "ثاني", etc.
  - age_group: VARCHAR(50) — اختياري — مثال: "6-8 سنوات"
  - available-seats يُستخدم من صفحة enrollments
```

---

### 📋 assignments — إسناد المهام للمعلمين

```
PAGE_ID: assignments
PAGE_TITLE: 📋 إسناد المهام للمعلمين
PAGE_SUBTITLE: ربط المعلمين بالمواد والفصول للسنة الدراسية

DB_TABLES: teacher_assignments (id, teacher_id, subject_id, class_id, academic_year_id)
           teachers (id, user_id, specialty)
           users (id, full_name)
           subjects (id, subject_name)
           classes (id, class_name)
           academic_years (id, year_name, is_current)

HEADER_ACTIONS:
  - تصدير Excel  | btn-ghost
  - إسناد جديد  | btn-primary | openModal('modal-add-assignment')

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
    - المعلم         | avatar + الاسم + التخصص
    - المادة         | badge ملوّن — subject_name
    - الفصل          | text — class_name
    - السنة الدراسية | text — year_name
    - عدد الطلاب     | text — (COUNT students في الفصل) ← col-hide-mobile
    - الإجراءات      | تعديل | حذف الإسناد
  pagination: true

MODALS:
  modal-add-assignment:
    title: 📋 إسناد جديد
    fields:
      - المعلم         | select (مع بحث live) | required
      - المادة         | select (تُفلتر حسب specialty المعلم المختار) | required
      - الفصل          | select | required
      - السنة الدراسية | select (الحالية is_current افتراضياً) | required
    submit_label: تأكيد الإسناد
    api: POST /api/teacher-assignments
    on_submit_first: GET /api/teacher-assignments/check-duplicate?teacher_id=&subject_id=&class_id=&year_id=
    on_duplicate: openModal('modal-conflict-warning')

  modal-conflict-warning:
    title: ⚠️ تعارض في الإسناد
    content: "هذا المعلم مُسند بالفعل لهذه المادة في هذا الفصل."
             "هل تريد الاستبدال أم الإلغاء؟"
    actions: [استبدال القديم | إلغاء]

API_ENDPOINTS:
  - GET    /api/teacher-assignments?teacher=&class=&subject=&year=
  - POST   /api/teacher-assignments
  - PATCH  /api/teacher-assignments/{id}
  - DELETE /api/teacher-assignments/{id}
  - GET    /api/teacher-assignments/check-duplicate?teacher_id=&subject_id=&class_id=&year_id=

NOTES:
  - UNIQUE constraint المفترض: (teacher_id, subject_id, class_id, academic_year_id)
  - حذف الإسناد: تأكيد مطلوب "ستُحذف الحصص المرتبطة به من الجدول"
  - تحذير: إن كان المعلم لديه > 20 حصة/أسبوع (overload warning badge)
```

---

### ⭐ grades — الدرجات والتقييمات

```
PAGE_ID: grades
PAGE_TITLE: ⭐ الدرجات والتقييمات
PAGE_SUBTITLE: متابعة أداء الطلاب وإصدار الشهادات

DB_TABLES: grades (id, student_id, assessment_id, grade_value, teacher_remarks)
           assessments (id, title, type, max_grade, assignment_id, due_date)
           teacher_assignments (id, teacher_id, subject_id, class_id)
           students (id, user_id, class_id)
           users (id, full_name)

HEADER_ACTIONS:
  - تصدير Excel    | btn-ghost
  - إضافة تقييم   | btn-primary | openModal('modal-add-grade')
  - إدخال جماعي   | btn-ghost   | openModal('modal-bulk-grades')

KPI_CARDS:
  - 82%  | متوسط الدرجات العام | blue
  - 34   | طالب ناجح           | green
  - 8    | طالب يحتاج دعم      | orange
  - 3    | طالب راسب           | red

TABS:
  - كل التقييمات | all
  - الفصل الأول  | term1
  - الفصل الثاني | term2
  - السنوي        | annual

FILTERS:
  - select: الفصل الدراسي [الكل | ...]
  - select: المادة [الكل | ...]
  - select: المعلم [الكل | ...]
  - select: النتيجة [الكل | ناجح | راسب | ممتاز | يحتاج دعم]

TABLE:
  id: grades-table
  columns:
    - الطالب  | avatar + الاسم + #رقم
    - الفصل   | text
    - المادة   | text — subject_name
    - عنوان التقييم | text — assessments.title
    - الدرجة  | text Bold + لون تلقائي:
                  أحمر إن grade_value/max_grade < 0.5
                  برتقالي إن 0.5 ≤ % < 0.7
                  أخضر إن 0.7 ≤ % < 0.9
                  ذهبي إن ≥ 0.9
    - من أصل  | text — assessments.max_grade ← col-hide-mobile
    - النسبة  | badge بنفس منطق الألوان
    - تاريخ التقييم | text — due_date
    - الإجراءات | تعديل | شهادة PDF
  pagination: true

MODALS:
  modal-add-grade:
    title: ⭐ إضافة تقييم
    fields:
      - الطالب             | select (مع بحث) | required
      - المادة             | select | required
      - عنوان التقييم      | text | مثال: اختبار الفصل الأول | required
      - نوع التقييم        | select: اختبار شفهي/كتابي/مشروع/واجب | required
      - الدرجة المحققة     | number | required
      - من أصل (max_grade) | number | 20 افتراضياً | required
      - الفصل الدراسي      | select: الأول/الثاني/السنوي | required
      - تاريخ التقييم      | date | required
      - ملاحظات المعلم     | textarea — teacher_remarks
    submit_label: حفظ التقييم
    api: POST /api/assessments  (then POST /api/grades)
    note: النسبة = (grade_value / max_grade * 100) — تُحسب JS-side عند الكتابة

  modal-bulk-grades:
    title: 📥 إدخال جماعي للدرجات
    fields:
      - الفصل الدراسي | select | required → يُحمّل طلاب الفصل
      - المادة         | select | required
      - عنوان التقييم  | text | required
      - من أصل        | number | 20 | required
      - الفصل الدراسي (term) | select | required
    content:
      بعد الاختيارات: جدول ديناميكي:
        [اسم الطالب | حقل درجة number | النسبة realtime]
      زر "حفظ الكل"
    api: POST /api/grades/bulk

API_ENDPOINTS:
  - GET    /api/grades?page=&class=&subject=&term=&result=
  - POST   /api/assessments
  - POST   /api/grades
  - POST   /api/grades/bulk  (body: [{ student_id, assessment_id, grade_value }])
  - PATCH  /api/grades/{id}
  - DELETE /api/grades/{id}
  - POST   /api/certificates/{student_id}  ← PDF شهادة

NOTES:
  - النتيجة: ناجح ≥ 50% | ممتاز ≥ 90% | يحتاج دعم = 40-49% | راسب < 40%
  - شهادة PDF: اسم الطالب + الفصل + السنة + جدول المواد+الدرجات + التوقيع
```

---

### 🔄 stock-actions — حركة المخزون

```
PAGE_ID: stock-actions
PAGE_TITLE: 🔄 حركة المخزون
PAGE_SUBTITLE: سجل جميع عمليات الإدخال والإخراج من المخزون

DB_TABLES: inventory_logs (id, item_id, quantity, action_type, reference_id, action_date)
           inventory_items (id, item_name, category, quantity_in_stock)

HEADER_ACTIONS:
  - تصدير Excel   | btn-ghost
  - إضافة حركة   | btn-primary | openModal('modal-add-stock-action')

KPI_CARDS:
  - 23  | حركة هذا الأسبوع      | blue
  - 12  | إدخالات (in)          | green
  - 11  | إخراجات (out)         | orange
  - 4   | أصناف وصلت للحد الأدنى | red

TABS:
  - كل الحركات | all
  - إدخال (in) | in
  - إخراج (out)| out

FILTERS:
  - search: "بحث باسم الصنف"
  - select: الصنف [الكل | ...]
  - select: النوع [الكل | إدخال | إخراج]
  - date-range: من / إلى (action_date)
  - select: المسؤول (created_by — إن أُضيف للـ logs)

TABLE:
  id: stock-actions-table
  columns:
    - التاريخ والوقت  | text — action_date
    - الصنف          | text Bold — item_name
    - نوع الحركة     | badge-success(إدخال) / badge-warning(إخراج)
    - الكمية         | text Bold — quantity
    - رصيد ما بعد    | text — (quantity_in_stock بعد الحركة) ← col-hide-mobile
    - المرجع         | text — reference_id (اختياري)
    - الإجراءات      | عرض التفاصيل
  pagination: true

MODALS:
  modal-add-stock-action:
    title: 🔄 تسجيل حركة مخزون
    fields:
      - الصنف         | select (مع بحث live) | required
      - الرصيد الحالي | text | disabled (auto من inventory_items.quantity_in_stock)
      - نوع الحركة    | select: إدخال (in) / إخراج (out) | required
      - الكمية        | number | required
        validation JS: إن type=out → لا تتجاوز quantity_in_stock
      - المرجع        | text | مثال: فاتورة رقم 123 | اختياري
    submit_label: تأكيد الحركة
    api: POST /api/inventory/actions
    on_success: showToast('تم التسجيل — الرصيد الجديد: X','success')

API_ENDPOINTS:
  - GET    /api/inventory/logs?page=&type=&item=&from=&to=
  - POST   /api/inventory/actions
  - GET    /api/inventory/logs/{id}

NOTES:
  - action_type: 'in' / 'out'
  - بعد كل حركة out: تحقق تلقائي من reorder_level → تنبيه إن نقص
  - مكمّل لصفحة inventory: inventory يعرض الأصناف، stock-actions يعرض الحركات
  - reference_id: VARCHAR(100) — رقم فاتورة أو اسم عملية مرجعية
```

---

### 🍽️ consumptions — الاستهلاك اليومي

```
PAGE_ID: consumptions
PAGE_TITLE: 🍽️ الاستهلاك اليومي
PAGE_SUBTITLE: تسجيل استهلاك المواد الغذائية والمستلزمات يومياً

DB_TABLES: daily_consumptions (id, branch_id, consumption_date, category,
           item_name, quantity, unit_price, total_cost, meal_type, notes)
           branches (id, branch_name)

HEADER_ACTIONS:
  - تصدير Excel           | btn-ghost
  - تسجيل استهلاك اليوم  | btn-primary | openModal('modal-add-consumption')

KPI_CARDS:
  - 3,250 دج  | تكلفة اليوم    | blue
  - 18,400 دج | تكلفة الأسبوع  | orange
  - 67,200 دج | تكلفة الشهر    | red
  - 31        | صنفاً مُستهلَكاً الشهر | green

SPECIAL_COMPONENTS:
  - بطاقة "استهلاك اليوم" في أعلى الصفحة:
      GET /api/daily-consumptions?date=today
      إن وجدت بيانات:
        عرض جدول صغير: الصنف + الكمية + التكلفة
        إجمالي + badge "مسجّل ✓"
      إن لم توجد:
        alert برتقالي "⚠️ لم يُسجّل استهلاك اليوم بعد"
        زر "سجّل الآن" → openModal('modal-add-consumption')

TABLE — السجل التاريخي:
  id: consumptions-table
  columns:
    - التاريخ          | text — consumption_date
    - الفرع            | text — branch_name
    - الفئة            | badge — category
    - الصنف            | text — item_name
    - الكمية           | text — quantity
    - التكلفة الإجمالية | text Bold — total_cost
    - نوع الوجبة       | text — meal_type (إن وجد)
    - الإجراءات        | عرض التفاصيل | تعديل (نفس اليوم فقط)
  pagination: true

MODALS:
  modal-add-consumption:
    title: 🍽️ تسجيل استهلاك اليوم
    content:
      - التاريخ: text readonly (اليوم تلقائياً)
      - الفرع: select (من branches) | required
      - جدول ديناميكي (.consumption-rows):
          [select الصنف (مع بحث) | الكمية | select الفئة | نوع الوجبة | سعر الوحدة (auto) | الإجمالي (auto)]
          زر "➕ إضافة صنف" يضيف صفاً جديداً
          زر 🗑️ لحذف كل صف
      - إجمالي التكلفة: SUM realtime — Bold
      - ملاحظات عامة: textarea
    submit_label: تأكيد وحفظ
    api: POST /api/daily-consumptions  (array من الأصناف)
    validation: لا يمكن تسجيل نفس الفرع في نفس اليوم مرتين

API_ENDPOINTS:
  - GET    /api/daily-consumptions?page=&branch=&from=&to=
  - GET    /api/daily-consumptions?date=today&branch=
  - POST   /api/daily-consumptions
  - PATCH  /api/daily-consumptions/{id}  ← نفس اليوم فقط
  - GET    /api/daily-consumptions/{id}

NOTES:
  - DB: كل صنف = سجل منفصل في daily_consumptions
  - unit_price: يُملأ تلقائياً من inventory_items إن كان الصنف موجوداً في المخزون
  - total_cost = quantity × unit_price (JS-side realtime)
  - تعديل استهلاك يوم سابق: admin فقط (> 24 ساعة)
  - category: مواد غذائية / مستلزمات / تنظيف / أخرى
  - meal_type: إفطار / غداء / عشاء / وجبة خفيفة (اختياري)
```

---

### 📌 obligations — الالتزامات الخارجية

```
PAGE_ID: obligations
PAGE_TITLE: 📌 الالتزامات الخارجية
PAGE_SUBTITLE: متابعة الالتزامات المالية تجاه الموردين والجهات الخارجية

DB_TABLES: external_obligations (id, branch_id, obligation_type, beneficiary,
           month_name, amount_due, amount_paid, due_date, notes)
           branches (id, branch_name)

HEADER_ACTIONS:
  - تصدير Excel  | btn-ghost
  - التزام جديد | btn-primary | openModal('modal-add-obligation')

KPI_CARDS:
  - 285,000 دج | إجمالي الالتزامات | blue
  - 142,000 دج | المدفوع           | green
  - 143,000 دج | المتبقي           | red
  - 3          | مواعيد استحقاق خلال 7 أيام | orange

TABS:
  - كل الالتزامات         | all
  - مستحقة قريباً (≤ 7 أيام) | due_soon
  - متأخرة (overdue)      | overdue
  - مسددة بالكامل         | settled

FILTERS:
  - search: "بحث بالمورد أو النوع"
  - select: النوع [الكل | إيجار | ضريبة | مورد | خدمات | أخرى]
  - select: الفرع
  - date-range: تاريخ الاستحقاق

TABLE:
  id: obligations-table
  columns:
    - المورد/الجهة  | text Bold — beneficiary
    - نوع الالتزام  | badge: إيجار(blue)/ضريبة(red)/مورد(orange)/خدمات(green)/أخرى(gray)
    - الشهر         | text — month_name
    - المبلغ الإجمالي | text — amount_due
    - المدفوع       | text — amount_paid
    - المتبقي       | text ملوّن أحمر — (amount_due - amount_paid)
    - progress bar  | inline مضغوط (amount_paid/amount_due * 100)
    - تاريخ الاستحقاق | text + badge: متأخر(danger)/قريب(warning)/عادي
    - الإجراءات     | تسجيل دفعة | تعديل | سجل الدفعات
  row_coloring: danger-tint إن overdue
  pagination: true

MODALS:
  modal-add-obligation:
    title: 📌 إضافة التزام جديد
    fields:
      - المورد / الجهة   | text | required
      - نوع الالتزام     | select: إيجار/ضريبة/مورد/خدمات/أخرى | required
      - الفرع            | select (من branches) | required
      - الشهر            | text | مثال: مارس 2026 | required
      - المبلغ الإجمالي  | number | required
      - تاريخ الاستحقاق  | date | required
      - ملاحظات          | textarea
    submit_label: إضافة الالتزام
    api: POST /api/obligations

  modal-pay-obligation:
    title: 💳 تسجيل دفعة
    fields:
      - الالتزام       | text | disabled (auto)
      - المبلغ الإجمالي | text | disabled
      - المدفوع سابقاً | text | disabled
      - المتبقي الحالي | text | disabled (amount_due - amount_paid) أحمر
      - مبلغ الدفعة   | number | required (validation: ≤ المتبقي)
      - ملاحظات        | textarea
    submit_label: تأكيد الدفع
    api: PATCH /api/obligations/{id}/pay  (body: { amount })
    on_success: showToast('تم التسجيل — المتبقي: X دج','success')

STATE_MACHINE:
  states: [active, partial, settled, overdue]
  transitions:
    - active → partial   (amount_paid > 0 && < amount_due)
    - partial → settled  (amount_paid >= amount_due)
    - active/partial → overdue (due_date < today && amount_paid < amount_due)

API_ENDPOINTS:
  - GET    /api/obligations?page=&status=&type=&branch=
  - POST   /api/obligations
  - PATCH  /api/obligations/{id}
  - PATCH  /api/obligations/{id}/pay  (body: { amount })
  - DELETE /api/obligations/{id}

NOTES:
  - DB: amount_paid تُحدَّث تراكمياً عند كل دفعة
  - overdue = due_date < today && amount_paid < amount_due
  - due_soon = due_date <= today + 7 days && amount_paid < amount_due
  - تنبيه تلقائي قبل 7 أيام من الاستحقاق (notifications)
```

---

### 💵 cash-handovers — تسليم العهدة النقدية

```
PAGE_ID: cash-handovers
PAGE_TITLE: 💵 تسليم العهدة النقدية
PAGE_SUBTITLE: إقفال الصندوق اليومي — Clôture de Caisse

DB_TABLES: cash_handovers (id, branch_id, handover_date, amount, receiver_name,
           receipt_reference, notes)
           branches (id, branch_name)
           payments (id, payment_date, amount_paid) — لحساب total_received
           expenses (id, expense_date, amount) — لحساب total_paid

HEADER_ACTIONS:
  - إقفال الصندوق اليوم | btn-primary | openModal('modal-cash-close')
    (يصبح disabled + badge "مُقفَل ✓" إن تم الإقفال اليوم)

SPECIAL_COMPONENTS:
  - بطاقة "ملخص اليوم" (card كبيرة في أعلى الصفحة):
      GET /api/cash-handovers/today-summary
      يعرض:
        - إجمالي المستلم (sum payments اليوم) — أخضر
        - إجمالي المصروف (sum expenses اليوم) — أحمر
        - الرصيد المتوقع = مستلم - مصروف — أزرق Bold
        - مؤشر الإقفال:
            "مُقفَل اليوم ✓" badge-success إن وُجد handover لهذا اليوم
            "لم يُقفَل بعد ⚠️" badge-warning إن لم يوجد

TABLE — سجل الإقفالات السابقة:
  id: handovers-table
  columns:
    - التاريخ          | text — handover_date
    - الفرع            | text — branch_name
    - المبلغ (الفعلي)  | text — amount
    - المُستلم         | text — receiver_name
    - المرجع           | text — receipt_reference
    - الحالة           | badge-success(مُقفَل)
    - الإجراءات        | عرض التفاصيل
  pagination: true

MODALS:
  modal-cash-close:
    title: 🔒 إقفال الصندوق اليومي
    content:
      قسم "ملخص الحركات" (readonly):
        - إجمالي المستلم | text disabled
        - إجمالي المصروف | text disabled
        - الرصيد المتوقع | text disabled Bold
      فاصل بصري
      قسم "الإقفال الفعلي":
        - المبلغ المعدود فعلياً | number | required (يملأ amount في DB)
        - الفارق (variance) | text readonly | يُحسب JS: (فعلي - متوقع)
          لون: أخضر=0 | أحمر<0 | برتقالي>0
          تحذير إن |variance| > 500: "⚠️ فارق كبير، تأكد من العد مجدداً"
        - المُستلِم (receiver_name) | text | required
        - المرجع (receipt_reference) | text | اختياري
        - ملاحظات (notes) | textarea
    submit_label: اعتماد الإقفال
    submit_type: primary
    api: POST /api/cash-handovers
    validation: لا يمكن إقفال مرتين في نفس اليوم لنفس الفرع

API_ENDPOINTS:
  - GET    /api/cash-handovers?page=&branch=&from=&to=
  - GET    /api/cash-handovers/today-summary  ← sum payments + expenses اليوم + حالة الإقفال
  - POST   /api/cash-handovers
  - GET    /api/cash-handovers/{id}

NOTES:
  - amount في DB = المبلغ الفعلي المعدود (cash physically counted)
  - today-summary يجمع: SUM(payments.amount_paid WHERE DATE(payment_date)=today)
                         SUM(expenses.amount WHERE DATE(expense_date)=today)
  - variance لا يُحفظ في DB (محسوب frontend فقط عند الإقفال)
  - admin فقط يمكنه تعديل إقفال تم (override)
  - بعد الإقفال: زر "إقفال الصندوق اليوم" يصبح disabled
```

---

### 📢 notifications — مركز الإشعارات والإرسال الجماعي

```
PAGE_ID: notifications
PAGE_TITLE: 📢 مركز الإشعارات
PAGE_SUBTITLE: إرسال إشعارات جماعية للمعلمين وأولياء الأمور والطلاب

DB_TABLES: notifications (id, user_id, title, message, is_read, created_at)
           users (id, full_name, role_id)

HEADER_ACTIONS:
  - إرسال إشعار جماعي | btn-primary | openModal('modal-broadcast')

KPI_CARDS:
  - 48    | إشعار أُرسل هذا الشهر   | blue
  - 1,247 | إجمالي المستلمين        | green
  - 12    | إشعار اليوم              | orange
  - 98%   | معدل التسليم             | gray

TABS:
  - كل الإشعارات  | all
  - اليوم         | today
  - هذا الأسبوع   | week
  - هذا الشهر     | month

FILTERS:
  - search: "بحث في عنوان الإشعار"
  - select: الفئة المستهدفة [الكل | أولياء أمور | معلمون | طلاب | الجميع]
  - date-range: من / إلى (created_at)

TABLE — سجل الإشعارات المرسلة:
  id: notifications-table
  columns:
    - التاريخ والوقت  | text — created_at
    - العنوان         | text Bold — title
    - الفئة المستهدفة | badge: أولياء أمور(orange)/معلمون(blue)/الجميع(green)
    - الفصل المستهدف  | text (إن كان محدداً) ← col-hide-mobile
    - عدد المستلمين   | text — (COUNT notifications لنفس الـ broadcast)
    - المُرسِل        | avatar + اسم
    - الإجراءات       | عرض النص | إعادة إرسال
  pagination: true

MODALS:
  modal-broadcast:
    title: 📢 إرسال إشعار جماعي
    fields:
      - الفئة المستهدفة | select: أولياء أمور فصل محدد / كل أولياء الأمور / كل المعلمين / الجميع | required
      - الفصل المستهدف  | select (يظهر فقط إن اخترت "أولياء أمور فصل محدد") — من classes
      - عنوان الإشعار  | text | required
      - نص الإشعار     | textarea | required
      - عاجل؟          | checkbox (is_urgent) — يجعل الإشعار بلون أحمر
      معاينة: "سيُرسَل لـ X شخص" (يُحسب من الفئة المختارة)
    submit_label: إرسال الآن
    submit_type: primary
    api: POST /api/notifications/broadcast
    on_success: showToast('تم الإرسال لـ X مستلماً بنجاح','success')

  modal-notification-detail:
    title: 📋 تفاصيل الإشعار
    content:
      - العنوان + التاريخ + المُرسِل
      - الفئة المستهدفة + الفصل (إن وجد)
      - نص الإشعار الكامل
      - إحصائيات: عدد المستلمين / مقروء / غير مقروء
      - زر "إعادة إرسال"

API_ENDPOINTS:
  - GET    /api/notifications?page=&target=&from=&to=
  - POST   /api/notifications/broadcast  (body: { target, class_id?, title, message, is_urgent })
  - GET    /api/notifications/{id}
  - POST   /api/notifications/{id}/resend

NOTES:
  - broadcast يُنشئ سجلات notifications فردية لكل مستلم (user_id)
  - is_urgent: يُضاف كـ metadata (يمكن إضافة حقل للـ DB أو تضمينه في message)
  - عداد غير المقروء في header Sidebar من is_read=false للمستخدم الحالي
  - إعادة الإرسال = POST نسخة جديدة بنفس title + message
```

---

### 👤 profile — الملف الشخصي

```
PAGE_ID: profile
PAGE_TITLE: 👤 الملف الشخصي
PAGE_SUBTITLE: إدارة بياناتك الشخصية ومعلومات الاتصال

DB_TABLES: users (id, full_name, full_name_ar, full_name_fr, email, phone, address, wallet_balance, role_id, branch_id)
           roles (id, role_name)
           branches (id, branch_name)

HEADER_ACTIONS:
  - حفظ التعديلات | btn-primary | Layout.toast('تم حفظ البيانات بنجاح', 'success')

SPECIAL_COMPONENTS:
  - تخطيط من عمودين:
    * العمود الأيمن (30%): بطاقة الملف الشخصي (.profile-card)
      - صورة رمزية (Avatar) كبيرة ملوّنة بأول حرفين من الاسم.
      - الاسم الكامل (Bold) تحته الدور (role_name) بلون رمادي.
      - الفرع الحالي (branch_name).
      - بطاقة داخلية صغيرة تعرض رصيد المحفظة (wallet_balance) بخلفية زرقاء فاتحة مع أيقونة 💰.
    
    * العمود الأيسر (70%): نموذج تعديل البيانات (Card عادية تحتوي Form)
      - قسم "المعلومات الأساسية":
          * الاسم الكامل (عربي) | text | required (يُقرأ من full_name_ar)
          * الاسم الكامل (لاتيني) | text (يُقرأ من full_name_fr)
      - قسم "معلومات الاتصال":
          * البريد الإلكتروني | email | required
          * رقم الهاتف | tel | required
          * العنوان | textarea

API_ENDPOINTS:
  - GET    /api/users/profile   ← جلب بيانات المستخدم الحالي
  - PATCH  /api/users/profile   ← تحديث البيانات

NOTES:
  - حقل الدور (Role) والفرع (Branch) في بطاقة الملف الشخصي للقراءة فقط، حيث يتم تعيينها من قبل الإدارة.
  - تأكد من استخدام كلاسات النماذج الجاهزة: .form-row, .form-group, .form-input
```

### ⚙️ settings — إعدادات الحساب

```
PAGE_ID: settings
PAGE_TITLE: ⚙️ الإعدادات
PAGE_SUBTITLE: تخصيص واجهة النظام وتفضيلات الإشعارات

DB_TABLES: إعدادات الواجهة تعتمد غالباً على LocalStorage وتفضيلات المستخدم (user_preferences إن وُجدت لاحقاً)

HEADER_ACTIONS:
  - حفظ الإعدادات | btn-primary | showToast('تم تطبيق الإعدادات','success')

SPECIAL_COMPONENTS:
  - قائمة إعدادات مقسمة إلى بطاقات منفصلة (Cards):
    
    1. بطاقة "المظهر واللغة":
       - الوضع الداكن (Dark Mode): مفتاح تبديل (toggle-switch) — عند تغييره يستدعي `Layout.toggleTheme()`
       - لغة الواجهة: قائمة منسدلة (select) تحتوي: العربية (الافتراضي)، Français، English.
    
    2. بطاقة "تفضيلات الإشعارات":
       - تنبيهات النظام الداخلية (In-app): toggle-switch (مفعل افتراضياً)
       - إشعارات البريد الإلكتروني (الرسائل الهامة): toggle-switch
       - إشعار صوتي عند استلام رسالة جديدة: toggle-switch
    
    3. بطاقة "الفرع الافتراضي":
       - قائمة منسدلة لاختيار الفرع الذي يفتح عليه النظام تلقائياً عند تسجيل الدخول.

NOTES:
  - واجهة بسيطة ونظيفة تعتمد بشكل كبير على عنصر `.toggle-switch` المرفق في الـ CSS الخاص بك.
  - تطبيق الوضع الداكن يجب أن يعكس حالة `localStorage.getItem('school-theme')` عند تحميل الصفحة.
```
### 🛡️ security — الأمان

```
PAGE_ID: security
PAGE_TITLE: 🛡️ الأمان
PAGE_SUBTITLE: تحديث كلمة المرور ومراقبة نشاط الحساب

DB_TABLES: users (id, password)
           system_logs (user_id, action, ip_address, log_time) — مفلترة للمستخدم الحالي

SPECIAL_COMPONENTS:
  - تخطيط عمودي (رأسي):
    
    1. بطاقة "تغيير كلمة المرور" (.card):
       - حقل: كلمة المرور الحالية | password | required
       - حقل: كلمة المرور الجديدة | password | required
       - حقل: تأكيد كلمة المرور | password | required
       - مكون إضافي: مؤشر قوة كلمة المرور (شريط لوني سفلي: أحمر=ضعيف، أصفر=متوسط، أخضر=قوي).
       - زر: تحديث كلمة المرور | btn-accent | POST /api/users/profile/password
    
    2. بطاقة "سجل نشاط الحساب" (.card):
       - [cite_start]جدول يعرض آخر عمليات تسجيل الدخول الخاصة بهذا المستخدم (تُجلب من system_logs حيث action='login' [cite: 39]).

TABLE (سجل النشاط):
  id: login-history-table
  columns:
    - التاريخ والوقت | text — log_time
    - الإجراء       | badge-success (تسجيل دخول ناجح) / badge-danger (محاولة فاشلة)
    - عنوان IP      | text monospace — ip_address
    - المتصفح/الجهاز| text (يُستخرج من الـ headers إن توفر، أو يُكتب "غير معروف")
  pagination: false (اكتفِ بعرض آخر 5 أو 10 حركات فقط)

API_ENDPOINTS:
  - PATCH  /api/users/profile/password
  - GET    /api/users/profile/logs

NOTES:
  - يجب إضافة أيقونة عين (👁️) داخل حقول كلمة المرور لإظهار/إخفاء النص.
  - بعد نجاح تغيير كلمة المرور، أظهر Toast: "تم تغيير كلمة المرور، سيتم تسجيل خروجك من الأجهزة الأخرى."
```

*آخر تحديث: مارس 2026 — School ERP v2.0*
*القالب يغطي جميع الـ 25 صفحة مع مطابقة كاملة لـ database.wsd*