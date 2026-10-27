# دليل ملفات المشروع وتشغيله

## ما هو المشروع؟

تطبيق عربي لإدارة مشتريات وتوزيع الخضروات وحسابات البقالات والموردين. الواجهة مبنية بـ Next.js وReact، وقاعدة البيانات والمصادقة عبر Supabase/PostgreSQL. يدعم أدوار المدير والعامل وصاحب البقالة، مع قيود محاسبية وصلاحيات عزل للبيانات.

## المتطلبات والتشغيل

1. ثبّت Node.js 20.9 أو أحدث وDocker Desktop إذا كنت ستشغّل Supabase محلياً.
2. انسخ `.env.example` إلى `.env.local`، ثم أدخل رابط Supabase والمفتاح العام. أضف مفتاح الخدمة فقط عند الحاجة للوظائف الإدارية من الخادم.
3. ثبّت الحزم بالقفل المعتمد: `npm ci`.
4. لتشغيل الواجهة: `npm run dev` ثم افتح `http://localhost:3000`.
5. لإعداد قاعدة محلية: ثبّت Supabase CLI، ثم نفّذ `supabase start` و`supabase db reset`. ويمكن استخدام مشروع Supabase سحابي بدلاً من ذلك وتطبيق ملفات `supabase/migrations` بالترتيب.
6. للتحقق: `npm run check`. ولاختبارات قاعدة البيانات (بعد تشغيل Supabase): `npm run db:test`.

> لا تحفظ `.env.local` أو أي مفاتيح حقيقية في Git. ملف `.gitignore` يستبعدها بالفعل.

## ملفات الجذر والإعداد

| الملف | وظيفته باختصار |
| --- | --- |
| `.env.example` | نموذج متغيرات البيئة لـ Supabase واسم التطبيق والمنطقة الزمنية ومفاتيح الخصائص. |
| `.gitignore` | يستبعد الحزم والمخرجات وملفات البيئة والأسرار وملفات Supabase المحلية من Git. |
| `package.json` | تعريف مشروع Node.js والحزم وأوامر التطوير والبناء والاختبار. |
| `package-lock.json` | قفل الإصدارات الدقيقة للحزم لضمان تثبيت متكرر ومتطابق عبر `npm ci`. |
| `next.config.ts` | إعدادات Next.js ورؤوس حماية المتصفح، مع استخدام Webpack للبناء. |
| `tsconfig.json` | قواعد TypeScript الصارمة والاسم المستعار `@/` إلى `src/`. |
| `eslint.config.mjs` | قواعد ESLint الخاصة بـ Next.js وTypeScript. |
| `postcss.config.mjs` | تفعيل Tailwind CSS عبر PostCSS. |
| `vitest.config.ts` | إعداد Vitest واختبارات الوحدة ومسار الاسم المستعار. |
| `README.md` | الدليل العام للمشروع ووظائفه ومسارات التشغيل. |
| `gemini-code-1792530254546.html` | نموذج/مرجع واجهة HTML استُخدم في بناء تجربة المستخدم، وليس جزءاً من تشغيل التطبيق. |

## وثائق التحليل والتشغيل

| الملف | وظيفته باختصار |
| --- | --- |
| `SPEC.md` | المتطلبات الوظيفية التفصيلية وبيانات العمل المرجعية. |
| `PLAN.md` | الخطة المعمارية والتنفيذية الشاملة. |
| `REBUILD_PLAN.md` | خطة إعادة الهندسة والفجوات وما سيُحتفظ به أو يُعاد بناؤه. |
| `DATABASE_DESIGN.md` | تصميم الجداول والعلاقات وقواعد البيانات المقترحة. |
| `ACCOUNTING_RULES.md` | قواعد الحسابات والتقريب وتكلفة التوزيع والقيود. |
| `SECURITY.md` | نموذج التهديدات والأدوار والصلاحيات وعزل الصفوف والأسرار. |
| `UI_UX_SPEC.md` | مواصفات الواجهة العربية والتجاوب وإتاحة الاستخدام. |
| `TEST_PLAN.md` | استراتيجية الاختبارات والحالات المالية الإلزامية. |
| `DEPLOYMENT_PLAN.md` | خطة البيئات والنشر ومتغيرات البيئة وSupabase وVercel. |
| `DECISIONS.md` | القرارات الهندسية والافتراضات والمسائل المفتوحة والمخاطر. |
| `IMPLEMENTATION_STATUS.md` | حالة الميزات المنفذة والتحقق السابق. |
| `PROGRESS_REPORT.md` | تقرير التقدم والمنجز والمتبقي والمشكلات. |
| `PROJECT_FILES.md` | هذا الفهرس المختصر لجميع ملفات المشروع وطريقة تشغيله. |

## التطبيق (`src/app`)

| الملف | وظيفته باختصار |
| --- | --- |
| `src/app/layout.tsx` | التخطيط الجذري وبيانات الصفحة واتجاه العربية وخط التطبيق. |
| `src/app/globals.css` | Tailwind والهوية البصرية والخط Cairo وأنماط الواجهة العامة. |
| `src/app/page.tsx` | يحدد نقطة الدخول ويوجّه المستخدم حسب الجلسة والدور. |
| `src/app/setup/page.tsx` | صفحة إرشادية لإعداد Supabase عندما لا تكون البيئة مكتملة. |
| `src/app/demo/page.tsx` | وضع عرض تجريبي مع بيانات وتفاعل معزولين عن الإنتاج. |
| `src/app/login/page.tsx` | صفحة تسجيل الدخول. |
| `src/app/login/login-form.tsx` | نموذج العميل لتسجيل الدخول عبر Supabase. |
| `src/app/admin/layout.tsx` | حماية وتخطيط مساحة المدير. |
| `src/app/admin/page.tsx` | لوحة المدير ومؤشرات اليوم والكشوفات. |
| `src/app/admin/[section]/page.tsx` | صفحة ديناميكية لإدارة بيانات البقالات أو الموردين أو الأصناف. |
| `src/app/admin/archive/page.tsx` | أرشيف الأيام ومراجعة/تصحيح الكشوف. |
| `src/app/admin/night-orders/page.tsx` | إدخال ومتابعة طلبات الليل إدارياً. |
| `src/app/admin/opening/page.tsx` | تسجيل الأرصدة الافتتاحية. |
| `src/app/admin/sheets/page.tsx` | عرض الكشوف اليومية للإدارة. |
| `src/app/admin/statements/stores/page.tsx` | كشوف حساب البقالات. |
| `src/app/admin/statements/suppliers/page.tsx` | كشوف حساب الموردين. |
| `src/app/admin/vouchers/page.tsx` | إدارة سندات القبض والصرف وعكسها. |
| `src/app/worker/layout.tsx` | حماية وتخطيط مساحة العامل. |
| `src/app/worker/page.tsx` | لوحة مهام العامل اليومية. |
| `src/app/worker/night-orders/page.tsx` | شاشة العامل لإدخال طلبات الليل. |
| `src/app/worker/sheets/page.tsx` | شاشة العامل للكشف اليومي الموحد. |
| `src/app/portal/layout.tsx` | حماية وتخطيط بوابة صاحب البقالة. |
| `src/app/portal/page.tsx` | كشف حساب صاحب البقالة بصلاحية قراءة فقط. |
| `src/app/reports/pdf/daily-sheet/page.tsx` | صفحة طباعة PDF للكشف اليومي التفصيلي. |
| `src/app/reports/pdf/morning-orders/page.tsx` | صفحة طباعة PDF لطلبات الصباح. |
| `src/app/reports/pdf/store-statement/page.tsx` | صفحة طباعة PDF لكشف حساب بقالة. |
| `src/app/reports/pdf/supplier-statement/page.tsx` | صفحة طباعة PDF لكشف حساب مورد. |
| `src/proxy.ts` | وسيط Next.js لتحديث جلسة Supabase وحماية المسارات. |

## المكونات المشتركة (`src/components`)

| الملف | وظيفته باختصار |
| --- | --- |
| `src/components/layout/nav.ts` | تعريف روابط وقوائم التنقل بحسب الدور. |
| `src/components/layout/shell.tsx` | غلاف التطبيق: الرأس والقائمة الجانبية والمحتوى. |
| `src/components/pdf/pdf-document-layout.tsx` | تخطيط موحد للصفحات القابلة للطباعة/PDF. |
| `src/components/ui/primitives.tsx` | عناصر واجهة عامة مثل البطاقات والحقول وإحصاءات العرض. |
| `src/components/ui/status.tsx` | شارات الحالة والتنبيهات وحالة عدم وجود بيانات. |

## ميزة المحاسبة والكشف اليومي (`src/features`)

| الملف | وظيفته باختصار |
| --- | --- |
| `src/features/accounting/domain/period.ts` | حساب تاريخ العمل والتحقق من المدى وترقيم المستندات. |
| `src/features/accounting/domain/statements.ts` | بناء كشوف الحساب واتجاه الرصيد للبقالة أو المورد. |
| `src/features/daily-sheets/action-types.ts` | الأنواع المشتركة لنتائج أوامر الكشف اليومي. |
| `src/features/daily-sheets/actions.ts` | أمر خادمي لفتح مسودة كشف يومي. |
| `src/features/daily-sheets/data.ts` | تحميل الكشف والكتالوج وتحويل بيانات العرض إلى نماذج نطاق. |
| `src/features/daily-sheets/mutations.ts` | أوامر خادمية لحفظ السطور والتوزيع والترحيل والتصحيح. |
| `src/features/daily-sheets/domain/allocation.ts` | منطق توزيع الكميات وحساب التكلفة والتحقق من جاهزية الكشف. |
| `src/features/daily-sheets/domain/night-orders.ts` | منطق مقارنة طلبات الليل بالكميات المسلّمة وحالاتها. |
| `src/features/daily-sheets/purchase-line-row.tsx` | صف واجهة مشتريات الصنف والمورد. |
| `src/features/daily-sheets/quick-add-modal.tsx` | نافذة إضافة سريعة لسطر شراء وتوزيعه. |
| `src/features/daily-sheets/sheet-editor.tsx` | محرر الكشف اليومي للمسؤول أو العامل. |
| `src/features/daily-sheets/sheet-page.tsx` | حاوية خادمية لتحميل بيانات صفحة الكشف. |
| `src/features/daily-sheets/unified-worker-sheet.tsx` | واجهة العامل الموحدة للمشتريات والتوزيع. |

## العمليات الإدارية (`src/features/operations`)

| الملف | وظيفته باختصار |
| --- | --- |
| `actions.ts` | أوامر خادمية للطلبات والسندات والأرصدة والكتالوج والمستخدمين والإغلاق. |
| `bulk-night-order-matrix.tsx` | إدخال دفعة طلبات ليلية لجميع البقالات في مصفوفة. |
| `catalog-manager.tsx` | إدارة البقالات والموردين والأصناف. |
| `close-sheet-button.tsx` | زر إغلاق كشف يومي بعد اكتماله. |
| `night-order-editor.tsx` | محرر طلب ليلي واحد. |
| `opening-balance-form.tsx` | نموذج إدخال الرصيد الافتتاحي. |
| `reopen-sheet-button.tsx` | زر إعادة فتح كشف مغلق. |
| `reverse-voucher-button.tsx` | زر عكس سند مالي. |
| `statement-view.tsx` | عرض بنود كشف حساب والرصيد. |
| `user-manager.tsx` | واجهة إدارة مستخدمين وربطهم بالبقالات. |
| `user-manager-v2.tsx` | الإصدار الموسع لإدارة المستخدمين وتجاوزات الصلاحيات. |
| `voucher-form.tsx` | نموذج إنشاء سند قبض أو صرف وربطه بالطرف والحساب المناسب. |

## المكتبات والبنية التحتية (`src/lib`)

| الملف | وظيفته باختصار |
| --- | --- |
| `src/lib/config.ts` | إعدادات التطبيق العامة والتحقق من اكتمال إعداد Supabase. |
| `src/lib/format.ts` | تنسيق التاريخ والوقت والمبالغ والكميات للواجهة العربية. |
| `src/lib/money/decimal.ts` | حسابات عشرية آمنة للأموال دون أخطاء الفاصلة العائمة. |
| `src/lib/rpc.ts` | تغليف استدعاءات PostgreSQL RPC ومعالجة الأخطاء ومفاتيح عدم التكرار. |
| `src/lib/auth/session.ts` | قراءة الجلسة وفرض الأدوار وتحديد صفحة الهبوط. |
| `src/lib/supabase/client.ts` | عميل Supabase للمتصفح. |
| `src/lib/supabase/server.ts` | عميل Supabase في الخادم مع الكوكيز. |
| `src/lib/supabase/middleware.ts` | تحديث جلسة Supabase داخل الوسيط. |
| `src/lib/supabase/types.ts` | أنواع TypeScript للجداول والحالات والبيانات. |

## قاعدة البيانات (`supabase`)

| الملف | وظيفته باختصار |
| --- | --- |
| `supabase/config.toml` | تعريف مشروع Supabase المحلي. |
| `supabase/README.md` | دليل تشغيل وربط قاعدة البيانات محلياً أو سحابياً. |
| `supabase/migrations/README.md` | ملاحظات ترتيب وتطبيق الترحيلات. |
| `supabase/migrations/0001_schema.sql` | الجداول والأنواع والفهارس والقيود الأساسية. |
| `supabase/migrations/0002_rls.sql` | سياسات Row Level Security وعزل البيانات بالصلاحيات. |
| `supabase/migrations/0003_rpc.sql` | دوال RPC للعمليات الذرية الأساسية. |
| `supabase/migrations/0004_ledger_rpc.sql` | دوال ترحيل القيود المحاسبية ودفتر الأستاذ. |
| `supabase/migrations/0005_seed_reference.sql` | بيانات مرجعية أولية. |
| `supabase/migrations/0006_security_hardening.sql` | تقوية الصلاحيات والسياسات الأمنية. |
| `supabase/seed/test-data.sql` | بيانات اختبار اختيارية للتطوير المحلي. |
| `supabase/tests/01_ledger_and_constraints.sql` | اختبارات قيود دفتر الأستاذ وقواعد البيانات. |
| `supabase/tests/02_rpc_financial_scenarios.sql` | اختبارات سيناريوهات مالية لدوال RPC. |
| `supabase/tests/03_security_hardening.sql` | اختبارات سياسات الأمان بعد التقوية. |

## اختبارات الوحدة (`tests`)

| الملف | وظيفته باختصار |
| --- | --- |
| `tests/unit/allocation.test.ts` | اختبارات منطق توزيع الكميات وحالة جاهزية الكشف. |
| `tests/unit/money.test.ts` | اختبارات الحساب العشري والمبالغ. |
| `tests/unit/statements.test.ts` | اختبارات بناء كشوف الحساب واتجاه الأرصدة. |
