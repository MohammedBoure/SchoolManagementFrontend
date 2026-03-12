/**
 * ================================================================
 * layout.js — School ERP Shared Layout Engine
 * ================================================================
 * يُحقن تلقائياً في كل صفحة عبر:
 * <script src="layout.js"></script>
 * <script>Layout.init({ pageId: 'students', breadcrumb: ['القسم','الصفحة'] })</script>
 *
 * يوفر:
 * - Sidebar HTML كامل
 * - Top Header كامل
 * - دوال Navigation, Theme, Modals, Toast, Dropdowns
 * - إضافة صفحة جديدة: أضف فقط entry في PAGES_MAP
 * ================================================================
 */

// ================================================================
// PAGES MAP — أضف صفحة جديدة هنا فقط
// key        : pageId (يطابق id="page-{key}")
// label      : اسم الصفحة في Breadcrumb
// group      : اسم القسم في Breadcrumb
// navSelector: CSS selector للـ nav-link المقابل (يُضاف له class="active")
// ================================================================
const PAGES_MAP = {
  'dashboard':          { label: 'لوحة القيادة',          group: 'الرئيسية',           navSelector: '[data-page="dashboard"]' },
  'branches':           { label: 'إدارة الفروع',          group: 'الإعدادات',          navSelector: '[data-page="branches"]' },
  'academic-years':     { label: 'السنوات الدراسية',       group: 'الإعدادات',          navSelector: '[data-page="academic-years"]' },
  'financial-policies': { label: 'السياسات المالية',       group: 'الإعدادات',          navSelector: '[data-page="financial-policies"]' },
  'system-logs':        { label: 'سجلات النظام',           group: 'الإعدادات',          navSelector: '[data-page="system-logs"]' },
  'roles-permissions':  { label: 'الأدوار والصلاحيات',    group: 'الإعدادات',          navSelector: '[data-page="roles-permissions"]' }, // تمت الإضافة
  'users':              { label: 'المستخدمون',             group: 'الموارد البشرية',    navSelector: '[data-page="users"]' },
  'teachers':           { label: 'المعلمون',               group: 'الموارد البشرية',    navSelector: '[data-page="teachers"]' },
  'parents':            { label: 'أولياء الأمور',          group: 'الموارد البشرية',    navSelector: '[data-page="parents"]' },
  'programs':           { label: 'البرامج والمواد',        group: 'الأكاديميات',        navSelector: '[data-page="programs"]' },
  'classes':            { label: 'إدارة الفصول',           group: 'الأكاديميات',        navSelector: '[data-page="classes"]' },
  'enrollments':        { label: 'طلبات التسجيل',          group: 'الأكاديميات',        navSelector: '[data-page="enrollments"]' },
  'students':           { label: 'قاعدة الطلاب',           group: 'الأكاديميات',        navSelector: '[data-page="students"]' },
  'resources':          { label: 'الموارد التعليمية',      group: 'الأكاديميات',        navSelector: '[data-page="resources"]' }, // تمت الإضافة
  'fees':               { label: 'رسوم الطلاب',            group: 'المالية',            navSelector: '[data-page="fees"]' },
  'payrolls':           { label: 'إدارة الرواتب',          group: 'المالية',            navSelector: '[data-page="payrolls"]' },
  'expenses':           { label: 'المصروفات',              group: 'المالية',            navSelector: '[data-page="expenses"]' },
  'obligations':        { label: 'الالتزامات الخارجية',    group: 'المالية',            navSelector: '[data-page="obligations"]' },
  'cash-handovers':     { label: 'تسليم العهدة النقدية',   group: 'المالية',            navSelector: '[data-page="cash-handovers"]' },
  'assignments':        { label: 'إسناد المهام',           group: 'العمليات',           navSelector: '[data-page="assignments"]' },
  'schedules':          { label: 'الجداول الدراسية',       group: 'العمليات',           navSelector: '[data-page="schedules"]' },
  'attendance':         { label: 'مراقبة الحضور',          group: 'العمليات',           navSelector: '[data-page="attendance"]' },
  'grades':             { label: 'الدرجات والتقييمات',     group: 'العمليات',           navSelector: '[data-page="grades"]' },
  'inventory':          { label: 'كتالوج المخزون',         group: 'المخازن',            navSelector: '[data-page="inventory"]' },
  'stock-actions':      { label: 'حركة المخزون',           group: 'المخازن',            navSelector: '[data-page="stock-actions"]' },
  'consumptions':       { label: 'الاستهلاك اليومي',       group: 'المخازن',            navSelector: '[data-page="consumptions"]' },
  'store':              { label: 'المتجر المدرسي',         group: 'المخازن',            navSelector: '[data-page="store"]' }, // تمت الإضافة
  'messages':           { label: 'الرسائل',                group: 'التواصل',            navSelector: '[data-page="messages"]' },
  'notifications':      { label: 'مركز الإرسال',           group: 'التواصل',            navSelector: '[data-page="notifications"]' },
  'profile':            { label: 'الملف الشخصي',           group: 'الحساب',            navSelector: '' },
  'settings':           { label: 'الإعدادات',              group: 'الحساب',            navSelector: '' },
  'security':           { label: 'الأمان',                 group: 'الحساب',            navSelector: '' },
};

// ================================================================
// SIDEBAR HTML TEMPLATE
// data-page="xxx" يُحدد أي nav-link يُفعَّل عند navigateTo('xxx')
// ================================================================
function _buildSidebarHTML() {
  return `
<aside class="sidebar" id="sidebar">
  <div class="sidebar-brand">
    <div class="brand-icon"><i class="fas fa-graduation-cap"></i></div>
    <div class="brand-text">
      <div class="brand-name">نظام المدرسة</div>
      <div class="brand-sub">School ERP v2.0</div>
    </div>
  </div>

  <div class="sidebar-scroll">

    <div class="nav-group">
      <div class="nav-group-label">الرئيسية</div>
      <div class="nav-item">
        <div class="nav-link" data-page="dashboard" onclick="Layout.navigateTo('dashboard')" data-tooltip="لوحة القيادة">
          <i class="fas fa-th-large nav-icon"></i>
          <span class="nav-label">لوحة القيادة</span>
        </div>
      </div>
    </div>

    <div class="nav-group">
      <div class="nav-group-label">الإعدادات</div>
      <div class="nav-item">
        <div class="nav-link" onclick="Layout.toggleSubMenu(this)" data-tooltip="الإعدادات الأساسية">
          <i class="fas fa-cog nav-icon"></i>
          <span class="nav-label">الإعدادات الأساسية</span>
          <i class="fas fa-chevron-left nav-arrow"></i>
        </div>
        <div class="nav-sub">
          <div class="nav-link" data-page="branches"           onclick="Layout.navigateTo('branches')"           data-tooltip="الفروع"><i class="fas fa-circle nav-icon"></i><span class="nav-label">إدارة الفروع</span></div>
          <div class="nav-link" data-page="academic-years"     onclick="Layout.navigateTo('academic-years')"     data-tooltip="السنوات"><i class="fas fa-circle nav-icon"></i><span class="nav-label">السنوات الدراسية</span></div>
          <div class="nav-link" data-page="financial-policies" onclick="Layout.navigateTo('financial-policies')" data-tooltip="السياسات"><i class="fas fa-circle nav-icon"></i><span class="nav-label">السياسات المالية</span></div>
          <div class="nav-link" data-page="system-logs"        onclick="Layout.navigateTo('system-logs')"        data-tooltip="سجلات النظام"><i class="fas fa-circle nav-icon"></i><span class="nav-label">سجلات النظام</span></div>
          <div class="nav-link" data-page="roles-permissions"  onclick="Layout.navigateTo('roles-permissions')"  data-tooltip="الصلاحيات"><i class="fas fa-circle nav-icon"></i><span class="nav-label">الأدوار والصلاحيات</span></div>
        </div>
      </div>
    </div>

    <div class="nav-group">
      <div class="nav-group-label">الموارد البشرية</div>
      <div class="nav-item">
        <div class="nav-link" data-page="users"    onclick="Layout.navigateTo('users')"    data-tooltip="المستخدمون"><i class="fas fa-users nav-icon"></i><span class="nav-label">المستخدمون</span></div>
      </div>
      <div class="nav-item">
        <div class="nav-link" data-page="teachers" onclick="Layout.navigateTo('teachers')" data-tooltip="المعلمون"><i class="fas fa-chalkboard-teacher nav-icon"></i><span class="nav-label">المعلمون</span></div>
      </div>
      <div class="nav-item">
        <div class="nav-link" data-page="parents"  onclick="Layout.navigateTo('parents')"  data-tooltip="أولياء الأمور"><i class="fas fa-user-friends nav-icon"></i><span class="nav-label">أولياء الأمور</span></div>
      </div>
    </div>

    <div class="nav-group">
      <div class="nav-group-label">الشؤون الأكاديمية</div>
      <div class="nav-item">
        <div class="nav-link" onclick="Layout.toggleSubMenu(this)" data-tooltip="الأكاديميات">
          <i class="fas fa-book-open nav-icon"></i>
          <span class="nav-label">الأكاديميات</span>
          <i class="fas fa-chevron-left nav-arrow"></i>
        </div>
        <div class="nav-sub">
          <div class="nav-link" data-page="programs"    onclick="Layout.navigateTo('programs')"    data-tooltip="البرامج"><i class="fas fa-circle nav-icon"></i><span class="nav-label">البرامج والمواد</span></div>
          <div class="nav-link" data-page="classes"     onclick="Layout.navigateTo('classes')"     data-tooltip="الفصول"><i class="fas fa-circle nav-icon"></i><span class="nav-label">إدارة الفصول</span></div>
          <div class="nav-link" data-page="enrollments" onclick="Layout.navigateTo('enrollments')" data-tooltip="التسجيل">
            <i class="fas fa-circle nav-icon"></i><span class="nav-label">طلبات التسجيل</span>
            <span class="nav-badge" id="badge-enrollments">7</span>
          </div>
          <div class="nav-link" data-page="students"    onclick="Layout.navigateTo('students')"    data-tooltip="الطلاب"><i class="fas fa-circle nav-icon"></i><span class="nav-label">قاعدة الطلاب</span></div>
          <div class="nav-link" data-page="resources"   onclick="Layout.navigateTo('resources')"   data-tooltip="الموارد"><i class="fas fa-circle nav-icon"></i><span class="nav-label">الموارد التعليمية</span></div>
        </div>
      </div>
    </div>

    <div class="nav-group">
      <div class="nav-group-label">المالية</div>
      <div class="nav-item">
        <div class="nav-link" onclick="Layout.toggleSubMenu(this)" data-tooltip="المالية">
          <i class="fas fa-wallet nav-icon"></i>
          <span class="nav-label">الإدارة المالية</span>
          <i class="fas fa-chevron-left nav-arrow"></i>
        </div>
        <div class="nav-sub">
          <div class="nav-link" data-page="fees"            onclick="Layout.navigateTo('fees')"            data-tooltip="الرسوم"><i class="fas fa-circle nav-icon"></i><span class="nav-label">رسوم الطلاب</span></div>
          <div class="nav-link" data-page="payrolls"        onclick="Layout.navigateTo('payrolls')"        data-tooltip="الرواتب"><i class="fas fa-circle nav-icon"></i><span class="nav-label">الرواتب</span></div>
          <div class="nav-link" data-page="expenses"        onclick="Layout.navigateTo('expenses')"        data-tooltip="المصروفات"><i class="fas fa-circle nav-icon"></i><span class="nav-label">المصروفات</span></div>
          <div class="nav-link" data-page="obligations"     onclick="Layout.navigateTo('obligations')"     data-tooltip="الالتزامات"><i class="fas fa-circle nav-icon"></i><span class="nav-label">الالتزامات الخارجية</span></div>
          <div class="nav-link" data-page="cash-handovers"  onclick="Layout.navigateTo('cash-handovers')"  data-tooltip="العهدة النقدية"><i class="fas fa-circle nav-icon"></i><span class="nav-label">تسليم العهدة النقدية</span></div>
        </div>
      </div>
    </div>

    <div class="nav-group">
      <div class="nav-group-label">العمليات</div>
      <div class="nav-item">
        <div class="nav-link" data-page="assignments" onclick="Layout.navigateTo('assignments')" data-tooltip="إسناد المهام"><i class="fas fa-tasks nav-icon"></i><span class="nav-label">إسناد المهام</span></div>
      </div>
      <div class="nav-item">
        <div class="nav-link" data-page="schedules"   onclick="Layout.navigateTo('schedules')"   data-tooltip="الجداول"><i class="fas fa-calendar-alt nav-icon"></i><span class="nav-label">الجداول الدراسية</span></div>
      </div>
      <div class="nav-item">
        <div class="nav-link" data-page="attendance"  onclick="Layout.navigateTo('attendance')"  data-tooltip="الحضور"><i class="fas fa-user-check nav-icon"></i><span class="nav-label">مراقبة الحضور</span></div>
      </div>
      <div class="nav-item">
        <div class="nav-link" data-page="grades"      onclick="Layout.navigateTo('grades')"      data-tooltip="الدرجات"><i class="fas fa-star nav-icon"></i><span class="nav-label">الدرجات والتقييمات</span></div>
      </div>
    </div>

    <div class="nav-group">
      <div class="nav-group-label">المخازن</div>
      <div class="nav-item">
        <div class="nav-link" onclick="Layout.toggleSubMenu(this)" data-tooltip="المخازن">
          <i class="fas fa-boxes nav-icon"></i>
          <span class="nav-label">المخازن</span>
          <i class="fas fa-chevron-left nav-arrow"></i>
        </div>
        <div class="nav-sub">
          <div class="nav-link" data-page="inventory"     onclick="Layout.navigateTo('inventory')"     data-tooltip="كتالوج المخزون"><i class="fas fa-circle nav-icon"></i><span class="nav-label">كتالوج المخزون</span></div>
          <div class="nav-link" data-page="stock-actions" onclick="Layout.navigateTo('stock-actions')" data-tooltip="حركة المخزون"><i class="fas fa-circle nav-icon"></i><span class="nav-label">حركة المخزون</span></div>
          <div class="nav-link" data-page="consumptions"  onclick="Layout.navigateTo('consumptions')"  data-tooltip="الاستهلاك"><i class="fas fa-circle nav-icon"></i><span class="nav-label">الاستهلاك اليومي</span></div>
          <div class="nav-link" data-page="store"         onclick="Layout.navigateTo('store')"         data-tooltip="المتجر"><i class="fas fa-circle nav-icon"></i><span class="nav-label">المتجر المدرسي</span></div>
        </div>
      </div>
    </div>

    <div class="nav-group">
      <div class="nav-group-label">التواصل</div>
      <div class="nav-item">
        <div class="nav-link" data-page="messages"      onclick="Layout.navigateTo('messages')"      data-tooltip="الرسائل">
          <i class="fas fa-comments nav-icon"></i><span class="nav-label">الرسائل</span>
          <span class="nav-badge" id="badge-messages">3</span>
        </div>
      </div>
      <div class="nav-item">
        <div class="nav-link" data-page="notifications" onclick="Layout.navigateTo('notifications')" data-tooltip="الإشعارات">
          <i class="fas fa-broadcast-tower nav-icon"></i><span class="nav-label">مركز الإرسال</span>
        </div>
      </div>
    </div>

  </div><div class="sidebar-footer">
    <button class="sidebar-collapse-btn" onclick="Layout.toggleSidebar()">
      <i class="fas fa-chevron-right" id="collapse-icon"></i>
      <span class="collapse-label">طي الشريط</span>
    </button>
  </div>
</aside>`;
}

// ================================================================
// HEADER HTML TEMPLATE
// ================================================================
function _buildHeaderHTML() {
  return `
<header class="top-header">
  <div class="header-right">
    <button class="header-icon-btn" onclick="Layout.toggleMobile()" id="mobile-menu-btn" style="display:none">
      <i class="fas fa-bars"></i>
    </button>
    <nav class="breadcrumb" id="breadcrumb">
      <div class="bc-item"><a href="#" onclick="Layout.navigateTo('dashboard')">الرئيسية</a></div>
      <div class="bc-sep"><i class="fas fa-chevron-left"></i></div>
      <div class="bc-item bc-current">لوحة القيادة</div>
    </nav>
  </div>

  <div class="header-left">
    <div class="branch-selector" id="branch-selector-btn" onclick="Layout.toggleBranchDropdown()">
      <div class="branch-dot"></div>
      <i class="fas fa-code-branch"></i>
      <span id="current-branch">الفرع الرئيسي</span>
      <i class="fas fa-chevron-down" style="font-size:9px;color:var(--text-muted)"></i>
    </div>
    <div class="dropdown-menu" id="branch-dropdown" style="min-width:200px;top:calc(100% + 52px);right:auto;left:0">
      <div class="dropdown-item" onclick="Layout.setBranch('الفرع الرئيسي')"><i class="fas fa-circle" style="color:#48bb78;font-size:8px;width:14px"></i> الفرع الرئيسي</div>
      <div class="dropdown-item" onclick="Layout.setBranch('فرع الشمال')"><i class="fas fa-circle" style="color:var(--text-muted);font-size:8px;width:14px"></i> فرع الشمال</div>
      <div class="dropdown-item" onclick="Layout.setBranch('فرع الجنوب')"><i class="fas fa-circle" style="color:var(--text-muted);font-size:8px;width:14px"></i> فرع الجنوب</div>
    </div>

    <div class="header-divider"></div>

    <div style="position:relative">
      <button class="header-icon-btn" onclick="Layout.toggleNotifDropdown()">
        <i class="fas fa-bell"></i>
        <span class="badge" id="notif-badge">5</span>
      </button>
      <div class="notif-dropdown" id="notif-dropdown">
        <div class="notif-header">
          <span class="notif-title">الإشعارات</span>
          <span class="notif-mark-all" onclick="Layout.markAllRead()">تعليم الكل كمقروء</span>
        </div>
        <div class="notif-list" id="notif-list">
          </div>
        <div class="notif-footer"><a href="#" onclick="Layout.navigateTo('notifications')">عرض كل الإشعارات</a></div>
      </div>
    </div>

    <button class="header-icon-btn" onclick="Layout.navigateTo('messages')">
      <i class="fas fa-comment-dots"></i>
      <span class="badge" style="background:var(--brand-info)" id="msg-badge">3</span>
    </button>

    <div class="theme-toggle" id="theme-toggle" onclick="Layout.toggleTheme()">
      <div class="theme-toggle-thumb" id="theme-thumb">
        <i class="fas fa-sun" id="theme-icon" style="color:#f6c94e"></i>
      </div>
    </div>

    <div class="header-divider"></div>

    <div class="user-profile" onclick="Layout.toggleUserDropdown()" id="user-profile-btn">
      <div class="user-avatar" id="user-avatar-initials">أد</div>
      <div class="user-info">
        <div class="user-name" id="user-display-name">أحمد الدراجي</div>
        <div class="user-role" id="user-display-role">مدير النظام</div>
      </div>
      <i class="fas fa-chevron-down dropdown-arrow"></i>
      <div class="dropdown-menu" id="user-dropdown">
        <div class="dropdown-item" onclick="Layout.navigateTo('profile')"><i class="fas fa-user" style="width:14px"></i> الملف الشخصي</div>
        <div class="dropdown-item" onclick="Layout.navigateTo('settings')"><i class="fas fa-cog" style="width:14px"></i> الإعدادات</div>
        <div class="dropdown-item" onclick="Layout.navigateTo('security')"><i class="fas fa-shield-alt" style="width:14px"></i> الأمان</div>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item danger" onclick="showToast('جاري تسجيل الخروج...', 'info')"><i class="fas fa-sign-out-alt" style="width:14px"></i> تسجيل الخروج</div>
      </div>
    </div>
  </div>
</header>`;
}

// ================================================================
// NOTIFICATIONS DATA (يُستبدل بـ API لاحقاً)
// ================================================================
const NOTIF_DATA = [
  { icon: 'user-plus',          color: 'green',  text: 'طلب تسجيل جديد من <strong>أحمد محمد</strong>', time: 'منذ 5 دقائق',   unread: true },
  { icon: 'exclamation-triangle', color: 'red',  text: 'تحذير: مخزون <strong>الأوراق A4</strong> وصل لحد إعادة الطلب', time: 'منذ 15 دقيقة', unread: true },
  { icon: 'money-bill',          color: 'orange', text: 'رسوم دراسية متأخرة للطالب <strong>سارة العلي</strong>', time: 'منذ ساعة', unread: true },
  { icon: 'check-circle',        color: 'blue',   text: 'تم اعتماد راتب شهر <strong>مارس 2025</strong>', time: 'أمس',          unread: false },
  { icon: 'calendar',            color: 'green',  text: 'تم تحديث جدول الفصل <strong>الثاني مستوى أول</strong>', time: 'أمس', unread: false },
];

// ================================================================
// LAYOUT NAMESPACE — الواجهة العامة لكل صفحة
// ================================================================
const Layout = {

  // ── الحالة الداخلية ─────────────────────────────────────────
  _currentPage: 'dashboard',
  _sidebarCollapsed: false,

  // ================================================================
  // init() — استدعيه من كل صفحة
  // options: { pageId, breadcrumb?, user?, branch? }
  // ================================================================
  init(options = {}) {
    const {
      pageId    = 'dashboard',
      breadcrumb = null,          // ['القسم', 'الصفحة'] — اختياري، يُستنتج من PAGES_MAP
      user      = null,           // { name, role, initials } — اختياري
      branch    = null,           // 'اسم الفرع' — اختياري
    } = options;

    // حقن الـ Shell (Sidebar + Wrapper) في <body>
    this._injectShell();

    // تطبيق الثيم المحفوظ
    this._applyTheme(localStorage.getItem('school-theme') || 'light');

    // حقن الإشعارات
    this._renderNotifications();

    // تعيين بيانات المستخدم
    if (user) this.setUser(user);

    // تعيين الفرع
    if (branch) this.setBranch(branch);

    // الانتقال للصفحة الأولى
    this._currentPage = pageId;
    this._activatePage(pageId, breadcrumb);

    // Responsive check
    this._checkMobile();
    window.addEventListener('resize', () => this._checkMobile());

    // إغلاق Dropdowns عند النقر خارجها
    document.addEventListener('click', (e) => {
      if (!e.target.closest('[onclick]') &&
          !e.target.closest('.dropdown-menu') &&
          !e.target.closest('.notif-dropdown')) {
        this.closeAllDropdowns();
      }
    });

    // ESC يغلق Modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
      }
    });

    // Tabs delegation
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('tab-btn') && e.target.closest('.tabs')) {
        e.target.closest('.tabs').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
      }
    });

    // Modal overlay click-outside
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('open');
      }
    });

    // تشغيل onInit() إن وُجد في الصفحة (hook للصفحة الخاصة)
    if (typeof window.onPageInit === 'function') {
      window.onPageInit(pageId);
    }
  },

  // ================================================================
  // _injectShell — يبني الهيكل الكامل في <body>
  // ================================================================
  _injectShell() {
    // نحذف app-shell إن وُجد مسبقاً
    const existing = document.getElementById('app-shell');
    if (existing) existing.remove();

    const shell = document.createElement('div');
    shell.id = 'app-shell';
    shell.className = 'app-layout';
    shell.innerHTML = `
      ${_buildSidebarHTML()}
      <div class="main-wrapper" id="main-wrapper">
        ${_buildHeaderHTML()}
        <main class="page-content" id="page-content-area">
          </main>
      </div>
    `;

    // أي محتوى موجود في <body> ننقله داخل page-content-area
    const bodyChildren = Array.from(document.body.children);
    document.body.appendChild(shell);

    const contentArea = document.getElementById('page-content-area');
    bodyChildren.forEach(child => {
      if (child !== shell) contentArea.appendChild(child);
    });

    // Toast container
    const toast = document.createElement('div');
    toast.id = 'toast-container';
    toast.className = 'toast-container';
    document.body.appendChild(toast);
  },

  // ================================================================
  // NAVIGATION
  // ================================================================
  navigateTo(pageId, breadcrumbOverride = null) {
    // إخفاء كل الصفحات
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // إظهار الصفحة المطلوبة
    const target = document.getElementById('page-' + pageId);
    if (target) {
      target.classList.add('active');
    } else {
      console.warn(`[Layout] لم يُعثر على الصفحة: page-${pageId}`);
    }

    this._currentPage = pageId;
    this._activatePage(pageId, breadcrumbOverride);
    this.closeAllDropdowns();

    // Scroll to top
    const contentArea = document.getElementById('page-content-area');
    if (contentArea) contentArea.scrollTop = 0;

    // hook: onPageChange في الصفحة
    if (typeof window.onPageChange === 'function') {
      window.onPageChange(pageId);
    }
  },

  // تفعيل nav-link + تحديث breadcrumb
  _activatePage(pageId, breadcrumbOverride) {
    // إزالة active من كل nav-links
    document.querySelectorAll('.nav-link[data-page]').forEach(l => l.classList.remove('active'));

    // إضافة active للرابط الصحيح
    const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
      // افتح الـ sub-menu الأب إن وجد
      const parentSub = activeLink.closest('.nav-sub');
      if (parentSub && !parentSub.classList.contains('open')) {
        parentSub.classList.add('open');
        const parentTrigger = parentSub.previousElementSibling;
        if (parentTrigger) parentTrigger.classList.add('open');
      }
    }

    // تحديث Breadcrumb
    const info = PAGES_MAP[pageId];
    const bc = document.getElementById('breadcrumb');
    if (!bc) return;

    if (breadcrumbOverride) {
      // مخصص من الصفحة
      const parts = breadcrumbOverride;
      let html = `<div class="bc-item"><a href="#" onclick="Layout.navigateTo('dashboard')">الرئيسية</a></div>`;
      for (let i = 0; i < parts.length - 1; i++) {
        html += `<div class="bc-sep"><i class="fas fa-chevron-left"></i></div><div class="bc-item"><a href="#">${parts[i]}</a></div>`;
      }
      html += `<div class="bc-sep"><i class="fas fa-chevron-left"></i></div><div class="bc-item bc-current">${parts[parts.length - 1]}</div>`;
      bc.innerHTML = html;
    } else if (info) {
      bc.innerHTML = `
        <div class="bc-item"><a href="#" onclick="Layout.navigateTo('dashboard')">الرئيسية</a></div>
        <div class="bc-sep"><i class="fas fa-chevron-left"></i></div>
        <div class="bc-item"><a href="#">${info.group}</a></div>
        <div class="bc-sep"><i class="fas fa-chevron-left"></i></div>
        <div class="bc-item bc-current">${info.label}</div>
      `;
    }
  },

  // ================================================================
  // SIDEBAR
  // ================================================================
  toggleSidebar() {
    this._sidebarCollapsed = !this._sidebarCollapsed;
    const sidebar = document.getElementById('sidebar');
    const wrapper = document.getElementById('main-wrapper');
    const icon    = document.getElementById('collapse-icon');
    sidebar.classList.toggle('collapsed', this._sidebarCollapsed);
    wrapper.classList.toggle('expanded', this._sidebarCollapsed);
    if (icon) icon.style.transform = this._sidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
  },

  toggleMobile() {
    document.getElementById('sidebar').classList.toggle('mobile-open');
  },

  toggleSubMenu(el) {
    el.classList.toggle('open');
    const sub = el.nextElementSibling;
    if (sub?.classList.contains('nav-sub')) sub.classList.toggle('open');
  },

  // ================================================================
  // THEME
  // ================================================================
  toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    this._applyTheme(isDark ? 'light' : 'dark');
  },

  _applyTheme(theme) {
    const toggle = document.getElementById('theme-toggle');
    const icon   = document.getElementById('theme-icon');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      toggle?.classList.add('dark');
      if (icon) { icon.className = 'fas fa-moon'; icon.style.color = '#a5b4fc'; }
    } else {
      document.documentElement.removeAttribute('data-theme');
      toggle?.classList.remove('dark');
      if (icon) { icon.className = 'fas fa-sun'; icon.style.color = '#f6c94e'; }
    }
    localStorage.setItem('school-theme', theme);
  },

  // ================================================================
  // DROPDOWNS
  // ================================================================
  toggleNotifDropdown() {
    const d = document.getElementById('notif-dropdown');
    const wasOpen = d.classList.contains('open');
    this.closeAllDropdowns();
    if (!wasOpen) d.classList.add('open');
  },

  toggleUserDropdown() {
    const d = document.getElementById('user-dropdown');
    const wasOpen = d.classList.contains('open');
    this.closeAllDropdowns();
    if (!wasOpen) d.classList.add('open');
  },

  toggleBranchDropdown() {
    const d = document.getElementById('branch-dropdown');
    const wasOpen = d.classList.contains('open');
    this.closeAllDropdowns();
    if (!wasOpen) d.classList.add('open');
  },

  closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu, .notif-dropdown').forEach(d => d.classList.remove('open'));
  },

  // ================================================================
  // USER & BRANCH
  // ================================================================
  setUser({ name, role, initials }) {
    const n = document.getElementById('user-display-name');
    const r = document.getElementById('user-display-role');
    const a = document.getElementById('user-avatar-initials');
    if (n) n.textContent = name;
    if (r) r.textContent = role;
    if (a) a.textContent = initials || name.substring(0, 2);
  },

  setBranch(branchName) {
    const el = document.getElementById('current-branch');
    if (el) el.textContent = branchName;
    this.closeAllDropdowns();
  },

  // ================================================================
  // NOTIFICATIONS
  // ================================================================
  _renderNotifications() {
    const list = document.getElementById('notif-list');
    if (!list) return;
    list.innerHTML = NOTIF_DATA.map(n => `
      <div class="notif-item ${n.unread ? 'unread' : ''}">
        <div class="notif-icon-wrap ${n.color}"><i class="fas fa-${n.icon}"></i></div>
        <div class="notif-content">
          <div class="notif-text">${n.text}</div>
          <div class="notif-time">${n.time}</div>
        </div>
      </div>
    `).join('');
    this._updateNotifBadge();
  },

  _updateNotifBadge() {
    const count = NOTIF_DATA.filter(n => n.unread).length;
    const badge = document.getElementById('notif-badge');
    if (badge) badge.textContent = count > 0 ? count : '';
  },

  markAllRead() {
    NOTIF_DATA.forEach(n => n.unread = false);
    this._renderNotifications();
    document.querySelectorAll('.notif-item').forEach(i => i.classList.remove('unread'));
  },

  // ----------------------------------------------------------------
  // setBadge — تحديث عداد أي صفحة (مثل: Layout.setBadge('messages', 5))
  // ----------------------------------------------------------------
  setBadge(pageId, count) {
    const el = document.getElementById(`badge-${pageId}`);
    if (!el) return;
    el.textContent = count > 0 ? count : '';
    el.style.display = count > 0 ? '' : 'none';
  },

  // ================================================================
  // MODALS
  // ================================================================
  openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('open');
  },

  closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
  },

  // ================================================================
  // TOAST
  // ================================================================
  toast(message, type = 'info') {
    const icons = {
      success: 'check-circle',
      error:   'times-circle',
      warning: 'exclamation-triangle',
      info:    'info-circle'
    };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<i class="fas fa-${icons[type] || 'info-circle'}"></i> ${message}`;
    const container = document.getElementById('toast-container');
    if (container) container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-20px)';
      el.style.transition = 'all 0.3s ease';
      setTimeout(() => el.remove(), 300);
    }, 3500);
  },

  // ================================================================
  // RESPONSIVE
  // ================================================================
  _checkMobile() {
    const isMobile = window.innerWidth <= 768;
    const btn = document.getElementById('mobile-menu-btn');
    if (btn) btn.style.display = isMobile ? 'flex' : 'none';
  },

  // ================================================================
  // HELPERS — دوال مساعدة للصفحات
  // ================================================================

  // بناء Bar Chart بسيط (CSS-based)
  buildBarChart(containerId, data, maxVal = 100) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = data.map(d => `
      <div class="bar-group">
        <div class="bar-group-bars">
          ${d.bars.map(b => `
            <div class="bar ${b.cls}" style="height:${(b.val / maxVal) * 130}px" title="${b.label}: ${b.val}"></div>
          `).join('')}
        </div>
        <div class="bar-label">${d.day}</div>
      </div>
    `).join('');
  },

  // تصدير جدول كـ CSV بسيط (placeholder — استبدل بـ API)
  exportTable(tableId, filename = 'export.csv') {
    const table = document.getElementById(tableId);
    if (!table) return;
    const rows = Array.from(table.querySelectorAll('tr'));
    const csv = rows.map(r =>
      Array.from(r.querySelectorAll('th,td')).map(c => `"${c.innerText.trim()}"`).join(',')
    ).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  },

};

// ================================================================
// BACKWARD COMPAT — دوال عامة للاستخدام من onclick="" في HTML
// ================================================================
function navigateTo(id, bc)    { Layout.navigateTo(id, bc); }
function openModal(id)         { Layout.openModal(id); }
function closeModal(id)        { Layout.closeModal(id); }
function showToast(msg, type)  { Layout.toast(msg, type); }
function toggleSidebar()       { Layout.toggleSidebar(); }
function toggleSubMenu(el)     { Layout.toggleSubMenu(el); }
function toggleTheme()         { Layout.toggleTheme(); }

// ================================================================
// BOTTOM NAVIGATION — Mobile Only
// ================================================================
function _buildBottomNavHTML() {
  return `
<nav class="bottom-nav" id="bottom-nav">
  <div class="bottom-nav-item active" data-page="dashboard" onclick="Layout.navigateTo('dashboard')" id="bn-dashboard">
    <i class="fas fa-th-large"></i>
    <span>الرئيسية</span>
  </div>
  <div class="bottom-nav-item" data-page="students" onclick="Layout.navigateTo('students')" id="bn-students">
    <i class="fas fa-user-graduate"></i>
    <span>الطلاب</span>
  </div>
  <div class="bottom-nav-item" data-page="fees" onclick="Layout.navigateTo('fees')" id="bn-fees">
    <i class="fas fa-coins"></i>
    <span>المالية</span>
  </div>
  <div class="bottom-nav-item" data-page="attendance" onclick="Layout.navigateTo('attendance')" id="bn-attendance">
    <i class="fas fa-user-check"></i>
    <span>الحضور</span>
    <span class="bn-badge" id="bn-badge-attendance" style="display:none">0</span>
  </div>
  <button class="bottom-nav-item bottom-nav-more" onclick="Layout.toggleMobile()">
    <i class="fas fa-grid-2"></i>
    <span>المزيد</span>
  </button>
</nav>
<div class="sidebar-overlay" id="sidebar-overlay" onclick="Layout._closeMobileSidebar()"></div>`;
}

// Patch: inject bottom nav + overlay into shell
const _origInjectShell = Layout._injectShell.bind(Layout);
Layout._injectShell = function() {
  _origInjectShell();
  // إضافة Bottom Nav و Overlay بعد app-shell
  const bnWrap = document.createElement('div');
  bnWrap.innerHTML = _buildBottomNavHTML();
  Array.from(bnWrap.children).forEach(el => document.body.appendChild(el));
};

// Patch: update bottom nav active state on navigation
const _origActivatePage = Layout._activatePage.bind(Layout);
Layout._activatePage = function(pageId, bc) {
  _origActivatePage(pageId, bc);
  // تحديث Bottom Nav
  document.querySelectorAll('.bottom-nav-item[data-page]').forEach(item => {
    item.classList.toggle('active', item.dataset.page === pageId);
  });
};

// Close sidebar on mobile
Layout._closeMobileSidebar = function() {
  document.getElementById('sidebar')?.classList.remove('mobile-open');
  document.getElementById('sidebar-overlay')?.classList.remove('active');
};

// Patch toggleMobile to also show overlay
const _origToggleMobile = Layout.toggleMobile.bind(Layout);
Layout.toggleMobile = function() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const isOpen  = sidebar?.classList.contains('mobile-open');
  if (isOpen) {
    sidebar?.classList.remove('mobile-open');
    overlay?.classList.remove('active');
  } else {
    sidebar?.classList.add('mobile-open');
    overlay?.classList.add('active');
  }
};

// Patch navigateTo to close sidebar on mobile after navigation
const _origNavigateTo = Layout.navigateTo.bind(Layout);
Layout.navigateTo = function(pageId, bc) {
  _origNavigateTo(pageId, bc);
  if (window.innerWidth <= 768) {
    Layout._closeMobileSidebar();
  }
};

// Swipe to open/close sidebar (touch support)
(function initSwipe() {
  let startX = 0, startY = 0;
  document.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    if (window.innerWidth > 768) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = Math.abs(e.changedTouches[0].clientY - startY);
    if (dy > 50) return; // تجاهل إذا التمرير رأسي
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    // سحب من اليمين (RTL) → فتح
    if (dx < -50 && startX > window.innerWidth - 40) {
      sidebar?.classList.add('mobile-open');
      overlay?.classList.add('active');
    }
    // سحب لليمين → إغلاق
    if (dx > 50 && sidebar?.classList.contains('mobile-open')) {
      sidebar?.classList.remove('mobile-open');
      overlay?.classList.remove('active');
    }
  }, { passive: true });
})();