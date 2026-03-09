# 📄 PAGE PROMPT TEMPLATE — School ERP
## القالب الموحد لإنشاء أي صفحة جديدة

---

## ⚡ كيف تستخدم هذا القالب

1. **انسخ الـ SECTION PROMPT** الخاص بالصفحة التي تريدها من القسم أدناه
2. **أرسله لـ Claude** مع التعليمة: `"أنشئ هذه الصفحة"` أو `"نفّذ هذا الـ prompt"`
3. **الناتج** سيكون HTML جاهز تضعه داخل `<div class="page" id="page-XXX">` في `index.html`
4. **الـ Modals** الخاصة بالصفحة تُضاف بعد `<!-- GLOBAL MODALS -->` في `index.html`

---

## 🏗️ ما يُورَث تلقائياً (لا تذكره في الـ prompt)

```
✅ Sidebar + Navigation        ← من layout.js
✅ Top Header + Breadcrumb     ← من layout.js
✅ Theme (Dark/Light Toggle)   ← من layout.js
✅ Toast Notifications         ← Layout.toast('رسالة', 'success')
✅ Modal System                ← openModal('id') / closeModal('id')
✅ Design System (CSS vars)    ← من style.css
✅ Typography + RTL            ← من style.css
✅ Responsive Layout           ← من style.css

مكونات CSS جاهزة للاستخدام المباشر:
  .kpi-card .kpi-grid          ← KPI Cards
  .card .card-header .card-body← بطاقات المحتوى
  .data-table .table-wrapper   ← الجداول
  .badge badge-success/warning ← الشارات اللونية
  .btn btn-primary/ghost/accent← الأزرار
  .form-input .form-select     ← حقول النماذج
  .modal .modal-overlay        ← النوافذ المنبثقة
  .tabs .tab-btn               ← التبويبات
  .pagination .page-btn        ← التصفح
  .alert-item                  ← التنبيهات
  .progress-bar-wrap           ← شرائط التقدم
  .search-input-wrap           ← حقل البحث
  .action-btns .action-btn     ← أزرار الإجراءات
  .avatar                      ← صور الأشخاص
  .form-row                    ← تخطيط النموذج
```

---

## 📐 هيكل الـ Prompt المعياري

```
PAGE_ID: [id الصفحة — يطابق data-page="xxx" في Sidebar]
PAGE_TITLE: [العنوان مع الإيموجي]
PAGE_SUBTITLE: [وصف مختصر]

HEADER_ACTIONS:           ← أزرار الـ header الأيمن
  - [نص الزر | نوعه | الإجراء]

KPI_CARDS:                ← بطاقات الإحصائيات (اختياري)
  - [القيمة | الوصف | اللون: green/blue/orange/red]

FILTERS:                  ← شريط الفلترة
  - [search | select: الخيارات | date | ...]

TABLE:                    ← الجدول الرئيسي (إن وجد)
  id: [table-id]
  columns: [العمود | نوعه: text/badge/avatar/actions/progress]
  actions: [عرض | تعديل | حذف | custom]
  pagination: true/false

TABS:                     ← التبويبات (اختياري)
  - [اسم التبويب | id اختياري]

MODALS:                   ← النوافذ المنبثقة
  [modal-id]:
    title: [العنوان]
    fields:
      - [الحقل | النوع | placeholder | required]
    submit_label: [نص زر الحفظ]
    submit_type: primary/accent
    api: [METHOD /api/endpoint]

SPECIAL_COMPONENTS:       ← مكونات خاصة (اختياري)
  - [وصف المكون]

STATE_MACHINE:            ← إن كانت الصفحة تستخدم StateMachine
  states: [الحالات]
  transitions: [الانتقالات]

API_ENDPOINTS:
  - GET    /api/[endpoint]?[params]
  - POST   /api/[endpoint]
  - PATCH  /api/[endpoint]/{id}/[action]
  - DELETE /api/[endpoint]/{id}  ← soft delete فقط

NOTES:                    ← ملاحظات خاصة للصفحة
  - [أي تفصيل إضافي]
```

---

## 📋 PROMPTS الجاهزة لكل صفحة

---

### 💰 fees — رسوم الطلاب والتحصيل

```
PAGE_ID: fees
PAGE_TITLE: 💰 رسوم الطلاب والتحصيل
PAGE_SUBTITLE: متابعة الفواتير والمدفوعات والديون المتأخرة

HEADER_ACTIONS:
  - تصدير Excel | btn-ghost | Layout.exportTable('fees-table','fees.csv')
  - تصدير PDF   | btn-ghost
  - تحصيل دفعة | btn-accent | openModal('modal-payment')

KPI_CARDS:
  - 148,000 دج | إجمالي الإيرادات الشهر | green
  - 32,500 دج  | الديون المتأخرة         | red
  - 12 طالب    | لديهم فواتير معلقة      | orange
  - 89%        | نسبة التحصيل           | blue

TABS:
  - كل الفواتير
  - متأخرة (is_overdue)
  - مدفوعة
  - جزئية

FILTERS:
  - search: "بحث بالاسم أو رقم الفاتورة"
  - select: جميع الفصول
  - date range: من / إلى
  - select: طريقة الدفع [كل الطرق | نقداً | بطاقة | تحويل]

TABLE:
  id: fees-table
  columns:
    - رقم الفاتورة  | text (invoice_number)
    - الطالب        | avatar + اسم + رقم
    - الفصل         | text
    - المبلغ الإجمالي | text (amount)
    - المدفوع        | text (paid)
    - المتبقي        | text ملوّن (أحمر إن > 0)
    - تاريخ الاستحقاق | text + badge لوني (أحمر = متأخر)
    - طريقة الدفع    | badge
    - الحالة         | badge-success/warning/danger
    - الإجراءات      | أيقونة عرض الإيصال | أيقونة تحصيل دفعة جديدة
  pagination: true

MODALS:
  modal-payment:
    title: 💳 معالجة الدفع
    fields:
      - بحث عن الطالب | search-input | ابحث عن الطالب... | required
      - المبلغ الإجمالي | text | disabled (auto)
      - المبلغ المدفوع مسبقاً | text | disabled (auto)
      - المبلغ المدفوع الآن | number | 0.00 | required
      - طريقة الدفع | select: نقداً / بطاقة / تحويل بنكي | required
      - ملاحظات | text | اختياري
    submit_label: تحصيل وإصدار إيصال PDF
    submit_type: accent
    api: POST /api/payments
    on_success: showToast('تم التحصيل وإصدار الإيصال رقم #...','success')

STATE_MACHINE:
  states: [pending, partial, paid, overdue]
  transitions:
    - pending → partial (عند دفع جزئي)
    - partial → paid (عند اكتمال المبلغ)
    - pending/partial → overdue (عند تجاوز due_date)

API_ENDPOINTS:
  - GET    /api/fees?page=&status=&class=&from=&to=
  - GET    /api/fees/{id}
  - POST   /api/payments        (receipt_number auto-generated)
  - GET    /api/payments/{id}/receipt  (PDF blob)

NOTES:
  - عرض شريط تقدم (progress bar) للمبلغ المدفوع مقابل الإجمالي
  - الفواتير المتأخرة: خلفية صف ملوّنة بخفة (warning tint)
  - receipt_number يُولَّد تلقائياً: REC-YYYY-XXXXX
```

---

### 💼 payrolls — إدارة الرواتب

```
PAGE_ID: payrolls
PAGE_TITLE: 💼 إدارة الرواتب
PAGE_SUBTITLE: رواتب الموظفين والمعلمين وإصدار قسائم الراتب

HEADER_ACTIONS:
  - تصدير Excel | btn-ghost
  - إنشاء رواتب الشهر | btn-primary | openModal('modal-create-payroll-month')

SPECIAL_COMPONENTS:
  - شريط اختيار الشهر والسنة (month/year picker) في أعلى الصفحة
    القيمة الافتراضية: الشهر الحالي
    عند التغيير: يُحدّث الجدول

KPI_CARDS:
  - 185,000 دج | إجمالي رواتب الشهر | blue
  - 120,000 دج | المدفوع حتى الآن   | green
  - 65,000 دج  | المتبقي             | orange
  - 12 موظف    | إجمالي الموظفين     | gray

TABLE:
  id: payrolls-table
  columns:
    - الموظف         | avatar + الاسم + الدور
    - الراتب الأساسي | text (base_salary)
    - المكافآت       | text (bonuses)
    - السلف          | text ملوّن بالأحمر (advances_deducted)
    - الخصومات       | text ملوّن بالأحمر (deductions)
    - عدد الحصص      | text (sessions_count)
    - صافي الراتب    | text Bold أخضر (net_salary = base + bonuses - advances - deductions)
    - الحالة         | badge: معلق (warning) | مدفوع (success)
    - الإجراءات:
        * زر "تحويل لمدفوع" (يظهر فقط إن الحالة = معلق)
        * زر طباعة Payslip PDF
  pagination: true

MODALS:
  modal-create-payroll-month:
    title: 📅 إنشاء رواتب الشهر
    fields:
      - الشهر | select | الشهر الحالي | required
      - السنة | select | السنة الحالية | required
    submit_label: إنشاء الرواتب
    submit_type: primary
    api: POST /api/payrolls/generate-month
    note: يُنشئ سجل راتب لكل موظف نشط

  modal-payroll-detail:
    title: 🧾 تفاصيل الراتب
    fields:
      - الموظف | text | disabled (auto)
      - الراتب الأساسي | number | required
      - المكافآت | number | 0
      - السلف المخصومة | number | 0
      - الخصومات الأخرى | number | 0
      - عدد الحصص | number | 0
      - صافي الراتب | text | حساب تلقائي (readonly)
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
  - net_salary يُحسب تلقائياً عند أي تغيير في الحقول
  - الراتب المدفوع لا يمكن تعديله (readonly)
  - payslip يحتوي على: اسم الموظف، الشهر، التفاصيل، التوقيع
```

---

### 📋 expenses — المصروفات التشغيلية

```
PAGE_ID: expenses
PAGE_TITLE: 📋 المصروفات التشغيلية
PAGE_SUBTITLE: متابعة واعتماد المصروفات اليومية

HEADER_ACTIONS:
  - تصدير | btn-ghost
  - إضافة مصروف | btn-primary | openModal('modal-add-expense')

KPI_CARDS:
  - 47,500 دج | إجمالي المصروفات الشهر | red
  - 8          | قيد الانتظار           | orange
  - 31,200 دج | معتمدة                 | green
  - 5,800 دج  | مرفوضة                 | gray

TABS:
  - كل المصروفات
  - قيد الانتظار (pending)
  - معتمدة (approved)
  - مرفوضة (rejected)

SPECIAL_COMPONENTS:
  - رسم بياني Donut: توزيع المصروفات حسب الفئة
    (مستلزمات | صيانة | كهرباء | وجبات | أخرى)
    يُعرض في Card صغيرة بجانب الجدول

FILTERS:
  - search: "بحث في الوصف"
  - select: الفئة [الكل | مستلزمات | صيانة | كهرباء | وجبات | أخرى]
  - date: التاريخ
  - select: المُدخِل

TABLE:
  id: expenses-table
  columns:
    - الوصف       | text (description)
    - الفئة       | badge ملوّن حسب الفئة
    - المبلغ      | text
    - المُدخِل    | avatar + اسم
    - التاريخ     | text
    - طريقة الدفع | badge
    - الحالة      | badge (StateMachine)
    - الإجراءات للمدير:
        * اعتماد ✓ (يظهر فقط إن pending)
        * رفض ✗ مع حقل سبب (يظهر فقط إن pending)
        * عرض الفاتورة المرفقة

STATE_MACHINE:
  states: [draft, pending, approved, rejected]
  transitions:
    - draft → pending (submit للاعتماد)
    - pending → approved (المدير يعتمد)
    - pending → rejected (المدير يرفض مع سبب)

MODALS:
  modal-add-expense:
    title: 📝 إضافة مصروف جديد
    fields:
      - وصف المصروف | text | required
      - الفئة | select: مستلزمات/صيانة/كهرباء/وجبات/أخرى | required
      - المبلغ | number | required
      - طريقة الدفع | select: نقداً/بطاقة | required
      - إرفاق فاتورة | file | اختياري
      - ملاحظات | textarea | اختياري
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

API_ENDPOINTS:
  - GET    /api/expenses?page=&status=&category=
  - POST   /api/expenses
  - PATCH  /api/expenses/{id}/approve
  - PATCH  /api/expenses/{id}/reject  (body: { reason })
```

---

### ✅ attendance — مراقبة الحضور والغياب

```
PAGE_ID: attendance
PAGE_TITLE: ✅ مراقبة الحضور والغياب
PAGE_SUBTITLE: مراجعة غيابات الطلاب وتبرير الغياب

HEADER_ACTIONS:
  - تصدير | btn-ghost
  - تقرير الحضور | btn-ghost

SPECIAL_COMPONENTS:
  - قسم علوي: 4 KPI Cards أفقية
      * نسبة الحضور اليوم: 91%  (green)
      * إجمالي الغيابات اليوم: 44 (red)
      * غيابات مبررة: 12 (blue)
      * غيابات غير مبررة: 32 (orange)
  - قسم "أكثر الطلاب غياباً (Top 5)":
      * جدول صغير: الطالب | الفصل | عدد الغيابات | نسبة الحضور
      * يُعرض في Card منفصلة

FILTERS:
  - select: الفصل [الكل | ...]
  - date: التاريخ (default: اليوم)
  - select: الحالة [الكل | حاضر | غائب | غائب مبرر]
  - search: بحث باسم الطالب

TABLE:
  id: attendance-table
  columns:
    - الطالب      | avatar + الاسم + الرقم
    - الفصل       | text
    - المادة      | text
    - المعلم      | text
    - التاريخ     | text
    - الحالة      | badge: حاضر(success)/غائب(danger)/مبرر(info)
    - سبب التبرير | text (يظهر فقط إن مبرر)
    - الإجراء     | زر "تبرير الغياب" — يظهر فقط إن status=absent AND role=admin
  pagination: true

MODALS:
  modal-justify-absence:
    title: 📝 تبرير غياب طالب
    fields:
      - اسم الطالب | text | disabled (auto-filled)
      - التاريخ    | text | disabled (auto-filled)
      - المادة     | text | disabled (auto-filled)
      - سبب التبرير | textarea | أدخل سبب التبرير... | required
    submit_label: حفظ التبرير
    submit_type: primary
    api: PATCH /api/attendance/{id}/justify

API_ENDPOINTS:
  - GET    /api/attendance?date=&class=&status=&page=
  - PATCH  /api/attendance/{id}/justify  (body: { reason })

NOTES:
  - زر "تبرير الغياب" حصري لـ role=admin أو role=manager
  - عند التبرير: الحالة تتغير من absent → justified
  - لا يمكن تبرير الحضور (present)
```

---

### 💵 cash-handovers — تسليم العهدة النقدية

```
PAGE_ID: cash-handovers
PAGE_TITLE: 💵 تسليم العهدة النقدية
PAGE_SUBTITLE: إقفال الصندوق اليومي — Clôture de Caisse

HEADER_ACTIONS:
  - إقفال الصندوق اليوم | btn-primary | openModal('modal-cash-close')

SPECIAL_COMPONENTS:
  - بطاقة "ملخص اليوم" (Card كبيرة علوية):
      * إجمالي المستلم (total_received)
      * إجمالي المصروف (total_paid)
      * الرصيد المتوقع (expected_balance = received - paid)
      * كلها من API: GET /api/cash-handovers/today-summary
  - مؤشر "هل تم الإقفال اليوم؟":
      badge أخضر "مُقفَل" أو أحمر "لم يُقفَل بعد"

TABLE:
  id: cash-handovers-table
  columns:
    - التاريخ          | text
    - الرصيد المتوقع   | text
    - الرصيد الفعلي    | text
    - الفرق (variance) | text ملوّن (أخضر=0 | أحمر=فرق سلبي | برتقالي=فرق موجب)
    - المعتمِد         | avatar + اسم
    - الحالة           | badge: معتمد/معلق
    - الإجراءات        | عرض التفاصيل
  pagination: true

MODALS:
  modal-cash-close:
    title: 🔒 إقفال الصندوق اليومي
    fields:
      - إجمالي المستلم  | text | disabled (auto من API)
      - إجمالي المصروف  | text | disabled (auto من API)
      - الرصيد المتوقع  | text | disabled (auto محسوب)
      - الرصيد الفعلي المعدود | number | أدخل المبلغ الفعلي... | required
      - الفرق (variance) | text | readonly | يُحسب تلقائياً عند الكتابة
      - ملاحظات         | textarea | اختياري
    submit_label: اعتماد الإقفال
    submit_type: primary
    api: POST /api/cash-handovers

API_ENDPOINTS:
  - GET    /api/cash-handovers?page=&branch=
  - GET    /api/cash-handovers/today-summary
  - POST   /api/cash-handovers
  - GET    /api/cash-handovers/{id}

NOTES:
  - variance = actual_balance - expected_balance
  - variance يُحسب JavaScript-side فور إدخال الرصيد الفعلي
  - لا يمكن إقفال الصندوق مرتين في نفس اليوم
  - تحذير إن variance > 500 دج: "فارق كبير، تأكد من العد"
```

---

### 📦 inventory — كتالوج المخزون

```
PAGE_ID: inventory
PAGE_TITLE: 📦 كتالوج المخزون
PAGE_SUBTITLE: إدارة مخزون المواد والمستلزمات

HEADER_ACTIONS:
  - تصدير | btn-ghost
  - صنف جديد | btn-primary | openModal('modal-add-item')

KPI_CARDS:
  - 47 صنف  | إجمالي الأصناف   | blue
  - 4 أصناف | تحت حد الطلب     | red
  - 128,500 دج | القيمة الإجمالية | green
  - 23 حركة | حركات هذا الأسبوع | orange

FILTERS:
  - search: "بحث باسم الصنف"
  - select: الفئة [الكل | مستلزمات | وجبات | أثاث | تقنية | أخرى]
  - select: المستوى [الكل | تحت حد الطلب | عادي | وفير]

TABLE:
  id: inventory-table
  columns:
    - الصنف      | text + أيقونة فئة
    - الفئة      | badge
    - الكمية الحالية | text + مؤشر لوني (أحمر < reorder_level)
    - حد إعادة الطلب | text (reorder_level)
    - وحدة القياس | text
    - سعر الوحدة  | text
    - آخر حركة    | text (تاريخ)
    - الإجراءات:
        * + إضافة كمية
        * - خصم كمية
        * سجل الحركات (يفتح modal)

MODALS:
  modal-add-item:
    title: 📦 إضافة صنف جديد
    fields:
      - اسم الصنف | text | required
      - الفئة | select | required
      - الكمية الابتدائية | number | 0
      - وحدة القياس | select: قطعة/رزمة/لتر/كغ/علبة
      - سعر الوحدة | number | required
      - حد إعادة الطلب | number | required
    submit_label: إضافة الصنف
    api: POST /api/inventory

  modal-stock-action:
    title: 🔄 حركة مخزون
    fields:
      - الصنف | text | disabled (auto-filled)
      - نوع الحركة | select: إضافة (in) / خصم (out) | required
      - الكمية | number | required
      - سبب الحركة | text | اختياري
    submit_label: تنفيذ
    api: POST /api/inventory/actions
    note: يولّد سجل Inventory Log تلقائياً

  modal-item-logs:
    title: 📋 سجل حركات الصنف
    content: جدول بكل الحركات (in/out) مع: التاريخ، الكمية، النوع، المسؤول

API_ENDPOINTS:
  - GET    /api/inventory?page=&category=&level=
  - POST   /api/inventory
  - PATCH  /api/inventory/{id}
  - POST   /api/inventory/actions
  - GET    /api/inventory/{id}/logs
```

---

### 💬 messages — صندوق الرسائل

```
PAGE_ID: messages
PAGE_TITLE: 💬 صندوق الرسائل
PAGE_SUBTITLE: التواصل الداخلي مع المعلمين وأولياء الأمور

LAYOUT: chat-layout (عمودان لا جدول)
  - عرض: عمودان
    * يسار (320px): قائمة المحادثات
    * يمين (flex-1): منطقة الدردشة

SPECIAL_COMPONENTS:
  قائمة المحادثات (يسار):
    - شريط بحث
    - TABS: [فردية | جماعية]
    - بطاقة محادثة: صورة + الاسم + الدور + آخر رسالة + الوقت + عداد غير مقروء
    - النقر يُحمّل المحادثة في العمود الأيمن

  منطقة الدردشة (يمين):
    - header المحادثة: الصورة + الاسم + الدور + حالة الاتصال (نقطة خضراء/رمادية)
    - منطقة الرسائل:
        * فقاعة رسالة مُرسَلة (يمين، خلفية brand-primary)
        * فقاعة رسالة مُستقبَلة (يسار، خلفية bg-surface-2)
        * دعم المرفقات (أيقونة مشبك + اسم الملف)
        * وقت كل رسالة
    - حقل الإرسال:
        * textarea قابل للتوسع
        * زر مشبك (file input) لإرفاق ملف (attachment_url)
        * زر إرسال

  زر "رسالة جماعية" في الـ header:
    يفتح modal اختيار الفئة

MODALS:
  modal-broadcast-msg:
    title: 📢 رسالة جماعية
    fields:
      - الفئة المستهدفة | select: أولياء فصل / كل المعلمين / الجميع | required
      - إن اخترت "أولياء فصل": select إضافي لاختيار الفصل
      - موضوع الرسالة | text | required
      - نص الرسالة    | textarea | required
    submit_label: إرسال للجميع
    submit_type: primary
    api: POST /api/messages/broadcast

API_ENDPOINTS:
  - GET    /api/conversations
  - GET    /api/conversations/{id}/messages
  - POST   /api/messages
  - POST   /api/messages/broadcast
  - PATCH  /api/conversations/{id}/read

NOTES:
  - الـ chat-layout يختلف عن layout الصفحات العادية
  - يجب إضافة CSS class="page chat-page" للـ page div
  - الـ height: 100% للحفاظ على ارتفاع ثابت للـ chat
```

---

### 👥 users — إدارة المستخدمين

```
PAGE_ID: users
PAGE_TITLE: 👥 إدارة المستخدمين
PAGE_SUBTITLE: إدارة حسابات المستخدمين وصلاحياتهم

HEADER_ACTIONS:
  - تصدير | btn-ghost
  - مستخدم جديد | btn-primary | openModal('modal-add-user')

KPI_CARDS:
  - 3   | مديرون     | blue
  - 18  | معلمون     | green
  - 145 | أولياء أمور | orange
  - 2   | حسابات موقوفة | red

FILTERS:
  - search: "بحث بالاسم أو البريد"
  - select: الدور [الكل | مدير | معلم | ولي أمر]
  - select: الحالة [الكل | نشط | موقوف]
  - select: الفرع

TABLE:
  id: users-table
  columns:
    - المستخدم     | avatar + الاسم + البريد الإلكتروني
    - الدور        | badge ملوّن (مدير=blue | معلم=green | ولي أمر=orange)
    - الفرع        | text
    - آخر دخول     | text (last_login)
    - تاريخ التسجيل | text
    - الحالة       | toggle switch (is_active) — soft delete
    - الإجراءات    | عرض | تعديل الصلاحيات

MODALS:
  modal-add-user:
    title: 👤 إضافة مستخدم جديد
    fields:
      - الاسم الكامل | text | required
      - البريد الإلكتروني | email | required
      - رقم الهاتف | tel
      - الدور | select: مدير/معلم/ولي أمر | required
      - الفرع | select | required
      - كلمة المرور | password | required
      - تأكيد كلمة المرور | password | required
    submit_label: إنشاء الحساب
    api: POST /api/users

API_ENDPOINTS:
  - GET    /api/users?page=&role=&status=&branch=
  - POST   /api/users
  - PATCH  /api/users/{id}
  - PATCH  /api/users/{id}/toggle   ← soft delete (is_active)
  - DELETE /api/users/{id}         ← حذف نهائي (admin only)

NOTES:
  - Toggle is_active يعمل inline بدون modal
  - لا يمكن حذف مستخدم له بيانات مالية أو أكاديمية مرتبطة
  - عند تعطيل حساب: تظهر رسالة تأكيد
```

---

### 📝 enrollments — طلبات التسجيل

```
PAGE_ID: enrollments
PAGE_TITLE: 📝 طلبات التسجيل
PAGE_SUBTITLE: مراجعة والموافقة على طلبات الالتحاق

HEADER_ACTIONS:
  - تصدير | btn-ghost
  - طلب تسجيل جديد | btn-primary | openModal('modal-new-enrollment')

KPI_CARDS:
  - 7  | طلبات معلقة | orange
  - 23 | مقبولة الشهر | green
  - 3  | مرفوضة     | red
  - 2  | فصول ممتلئة | blue

TABS:
  - معلقة (pending)
  - مقبولة
  - مرفوضة
  - كل الطلبات

TABLE:
  id: enrollments-table
  columns:
    - الطالب     | avatar + الاسم + التاريخ
    - الفصل المطلوب | text
    - المقاعد المتاحة | badge (أخضر = متاح | أحمر = ممتلئ)
    - ولي الأمر  | text
    - تاريخ الطلب | text
    - الحالة     | badge
    - الإجراءات:
        * قبول ✓ (إن pending) → يتحقق من checkAvailableSeats أولاً
        * رفض ✗ مع modal لإدخال السبب (إن pending)
        * عرض التفاصيل

STATE_MACHINE:
  states: [pending, approved, rejected, waitlist]
  transitions:
    - pending → approved  (seats available → create enrollment)
    - pending → waitlist  (no seats → قائمة انتظار)
    - pending → rejected  (manual rejection)

MODALS:
  modal-new-enrollment:
    fields:
      - اسم الطالب | text | required
      - الفصل | select (يُعرض عدد المقاعد المتاحة بجانب كل اختيار) | required
      - تاريخ التسجيل المقترح | date
    submit_label: تقديم الطلب
    api: POST /api/enrollments

  modal-reject-enrollment:
    fields:
      - سبب الرفض | textarea | required
    submit_label: تأكيد الرفض
    api: PATCH /api/enrollments/{id}/reject

API_ENDPOINTS:
  - GET    /api/enrollments?page=&status=
  - POST   /api/enrollments
  - PATCH  /api/enrollments/{id}/approve  ← triggers checkAvailableSeats
  - PATCH  /api/enrollments/{id}/reject   (body: { reason })
  - GET    /api/classes/{id}/available-seats
```

---

### 🗓️ schedules — الجداول الدراسية

```
PAGE_ID: schedules
PAGE_TITLE: 🗓️ الجداول الدراسية
PAGE_SUBTITLE: بناء ومتابعة الجداول الأسبوعية

HEADER_ACTIONS:
  - طباعة الجدول | btn-ghost
  - حصة جديدة | btn-primary | openModal('modal-add-session')

SPECIAL_COMPONENTS:
  - قائمة منسدلة اختيار الفصل (في أعلى الصفحة قبل الجدول)
  - الجدول الأسبوعي:
      Grid: 6 أعمدة (الأحد → الخميس + الجمعة اختياري)
               × 8 صفوف (الحصص: 8:00 | 9:00 | ... | 16:00)
      كل خلية تحتوي: اسم المادة + اسم المعلم (chip ملوّن)
      خلية فارغة: "+" عند hover لإضافة حصة
      تعارض الأوقات: chip أحمر مع icon تحذير ⚠️

MODALS:
  modal-add-session:
    title: 📅 إضافة حصة دراسية
    fields:
      - الفصل   | select | required
      - المادة   | select (مرتبطة بالفصل) | required
      - المعلم   | select (مرتبط بالمادة) | required
      - اليوم    | select: الأحد/الاثنين/.../الخميس | required
      - الساعة   | select: 8:00/9:00/.../16:00 | required
      - المدة    | select: 60 دقيقة / 90 دقيقة
    submit_label: إضافة الحصة
    api: POST /api/schedules
    on_submit_first: POST /api/schedules/check-conflicts
    on_conflict: عرض تحذير "تعارض! المعلم مشغول في هذا الوقت"

API_ENDPOINTS:
  - GET    /api/schedules?class_id=&year=
  - POST   /api/schedules
  - POST   /api/schedules/check-conflicts  (body: { teacher_id, day, time })
  - DELETE /api/schedules/{id}
  - GET    /api/schedules/{class_id}/print  (PDF)
```

---

*آخر تحديث: مارس 2026 — School ERP v2.0*
