import { useState, useEffect } from 'react';
import { HelpCircle, X, ChevronLeft, ChevronRight, Languages, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

type Language = 'en' | 'ur';

interface GuideStep {
  title: { en: string; ur: string };
  description: { en: string; ur: string };
  tip?: { en: string; ur: string };
}

interface ScreenGuide {
  screenName: { en: string; ur: string };
  introduction: { en: string; ur: string };
  steps: GuideStep[];
}

const guides: Record<string, ScreenGuide> = {
  '/': {
    screenName: { en: 'Login Screen', ur: 'لاگ ان سکرین' },
    introduction: {
      en: 'Welcome to TaleemHub! This is where you sign in to access your education management dashboard.',
      ur: 'تعلیم ہب میں خوش آمدید! یہاں سے آپ اپنے تعلیمی انتظامی ڈیش بورڈ تک رسائی کے لیے سائن ان کریں۔'
    },
    steps: [
      {
        title: { en: 'Step 1: Enter Phone Number', ur: 'مرحلہ 1: فون نمبر درج کریں' },
        description: {
          en: 'Type your 11-digit mobile phone number in the first field. This is the same number you used when creating your account. Example: 03001234567',
          ur: 'پہلے خانے میں اپنا 11 ہندسوں کا موبائل فون نمبر ٹائپ کریں۔ یہ وہی نمبر ہے جو آپ نے اکاؤنٹ بناتے وقت استعمال کیا تھا۔ مثال: 03001234567'
        },
        tip: {
          en: 'Make sure to enter all 11 digits without any spaces or dashes.',
          ur: 'یقینی بنائیں کہ تمام 11 ہندسے بغیر کسی خلا یا ڈیش کے درج کریں۔'
        }
      },
      {
        title: { en: 'Step 2: Enter Password', ur: 'مرحلہ 2: پاس ورڈ درج کریں' },
        description: {
          en: 'Type your password in the second field. This is the password you created during account registration. The password is hidden for security.',
          ur: 'دوسرے خانے میں اپنا پاس ورڈ ٹائپ کریں۔ یہ وہ پاس ورڈ ہے جو آپ نے اکاؤنٹ رجسٹریشن کے دوران بنایا تھا۔ سیکیورٹی کے لیے پاس ورڈ چھپا ہوا ہے۔'
        },
        tip: {
          en: 'If you forgot your password, contact your supervisor for help.',
          ur: 'اگر آپ اپنا پاس ورڈ بھول گئے ہیں تو مدد کے لیے اپنے سپروائزر سے رابطہ کریں۔'
        }
      },
      {
        title: { en: 'Step 3: Tap Sign In', ur: 'مرحلہ 3: سائن ان پر ٹیپ کریں' },
        description: {
          en: 'After entering your phone number and password, tap the blue "Sign In" button. If your credentials are correct, you will be taken to your dashboard.',
          ur: 'اپنا فون نمبر اور پاس ورڈ درج کرنے کے بعد نیلے "سائن ان" بٹن پر ٹیپ کریں۔ اگر آپ کی تفصیلات درست ہیں تو آپ کو اپنے ڈیش بورڈ پر لے جایا جائے گا۔'
        }
      },
      {
        title: { en: 'New User? Create Account', ur: 'نئے صارف؟ اکاؤنٹ بنائیں' },
        description: {
          en: 'If you don\'t have an account yet, tap "Create Account" at the bottom of the screen. You will need your CNIC, phone number, and school information to register.',
          ur: 'اگر آپ کا ابھی تک اکاؤنٹ نہیں ہے تو اسکرین کے نیچے "اکاؤنٹ بنائیں" پر ٹیپ کریں۔ رجسٹر کرنے کے لیے آپ کو اپنا شناختی کارڈ، فون نمبر اور اسکول کی معلومات درکار ہوں گی۔'
        }
      },
    ],
  },
  '/signup': {
    screenName: { en: 'Create Account', ur: 'اکاؤنٹ بنائیں' },
    introduction: {
      en: 'Register a new account to join TaleemHub. Fill in all required fields carefully.',
      ur: 'تعلیم ہب میں شامل ہونے کے لیے نیا اکاؤنٹ رجسٹر کریں۔ تمام مطلوبہ خانے احتیاط سے پُر کریں۔'
    },
    steps: [
      {
        title: { en: 'Step 1: Enter Your Full Name', ur: 'مرحلہ 1: اپنا پورا نام درج کریں' },
        description: {
          en: 'Enter your complete name exactly as it appears on your official documents (CNIC). Include your full name with father\'s name if required.',
          ur: 'اپنا مکمل نام بالکل اسی طرح درج کریں جیسے یہ آپ کے سرکاری دستاویزات (شناختی کارڈ) پر ہے۔ اگر ضرورت ہو تو والد کا نام بھی شامل کریں۔'
        },
        tip: {
          en: 'Use your official name as per government records.',
          ur: 'سرکاری ریکارڈ کے مطابق اپنا سرکاری نام استعمال کریں۔'
        }
      },
      {
        title: { en: 'Step 2: Enter Phone Number', ur: 'مرحلہ 2: فون نمبر درج کریں' },
        description: {
          en: 'Enter your 11-digit mobile phone number. This will be used for login and communication. Only numbers are allowed - the system will automatically remove any letters or special characters.',
          ur: 'اپنا 11 ہندسوں کا موبائل فون نمبر درج کریں۔ یہ لاگ ان اور رابطے کے لیے استعمال ہوگا۔ صرف نمبر درج کریں - سسٹم خودکار طور پر کسی بھی حرف یا خاص علامت کو ہٹا دے گا۔'
        },
        tip: {
          en: 'Example: 03001234567 (must be exactly 11 digits)',
          ur: 'مثال: 03001234567 (بالکل 11 ہندسے ہونے چاہئیں)'
        }
      },
      {
        title: { en: 'Step 3: Enter CNIC Number', ur: 'مرحلہ 3: شناختی کارڈ نمبر درج کریں' },
        description: {
          en: 'Enter your 13-digit CNIC (Computerized National Identity Card) number. The system will automatically add dashes in the correct format (12345-1234567-1).',
          ur: 'اپنا 13 ہندسوں کا شناختی کارڈ نمبر درج کریں۔ سسٹم خودکار طور پر درست فارمیٹ میں ڈیش لگا دے گا (12345-1234567-1)۔'
        },
        tip: {
          en: 'Just type the numbers, dashes will be added automatically.',
          ur: 'صرف نمبر ٹائپ کریں، ڈیش خودکار طور پر لگ جائیں گے۔'
        }
      },
      {
        title: { en: 'Step 4: Select Your Role', ur: 'مرحلہ 4: اپنا کردار منتخب کریں' },
        description: {
          en: 'Choose your job position from the dropdown menu. Options include: Teacher (استاد), Head Teacher (ہیڈ ٹیچر), AEO (اسسٹنٹ ایجوکیشن آفیسر), Training Manager (ٹریننگ مینیجر), and others.',
          ur: 'ڈراپ ڈاؤن مینو سے اپنا عہدہ منتخب کریں۔ اختیارات میں شامل ہیں: استاد، ہیڈ ٹیچر، AEO (اسسٹنٹ ایجوکیشن آفیسر)، ٹریننگ مینیجر اور دیگر۔'
        },
        tip: {
          en: 'Select the role that matches your official designation.',
          ur: 'وہ کردار منتخب کریں جو آپ کی سرکاری عہدے سے مطابقت رکھتا ہو۔'
        }
      },
      {
        title: { en: 'Step 5: Select District & School', ur: 'مرحلہ 5: ضلع اور اسکول منتخب کریں' },
        description: {
          en: 'First select your district from the dropdown. Then select your school using the EMIS code or school name. For AEOs, select your Markaz and assigned schools.',
          ur: 'پہلے ڈراپ ڈاؤن سے اپنا ضلع منتخب کریں۔ پھر EMIS کوڈ یا اسکول کے نام سے اپنا اسکول منتخب کریں۔ AEOs کے لیے اپنا مرکز اور تفویض کردہ اسکول منتخب کریں۔'
        }
      },
      {
        title: { en: 'Step 6: Create Password', ur: 'مرحلہ 6: پاس ورڈ بنائیں' },
        description: {
          en: 'Create a secure password with at least 6 characters. Use a mix of letters and numbers for better security. Remember this password for future logins.',
          ur: 'کم از کم 6 حروف کے ساتھ ایک محفوظ پاس ورڈ بنائیں۔ بہتر سیکیورٹی کے لیے حروف اور نمبروں کا مرکب استعمال کریں۔ مستقبل میں لاگ ان کے لیے یہ پاس ورڈ یاد رکھیں۔'
        },
        tip: {
          en: 'Write down your password somewhere safe.',
          ur: 'اپنا پاس ورڈ کہیں محفوظ جگہ لکھ لیں۔'
        }
      },
      {
        title: { en: 'Step 7: Submit Registration', ur: 'مرحلہ 7: رجسٹریشن جمع کریں' },
        description: {
          en: 'After filling all fields, tap the "Create Account" button. If successful, you will see a confirmation message and can proceed to login.',
          ur: 'تمام خانے پُر کرنے کے بعد "اکاؤنٹ بنائیں" بٹن پر ٹیپ کریں۔ کامیاب ہونے پر آپ کو تصدیقی پیغام نظر آئے گا اور لاگ ان کر سکتے ہیں۔'
        }
      },
    ],
  },
  '/dashboard': {
    screenName: { en: 'Dashboard', ur: 'ڈیش بورڈ' },
    introduction: {
      en: 'Your dashboard is the main control center. From here, you can access all features of TaleemHub.',
      ur: 'آپ کا ڈیش بورڈ مرکزی کنٹرول سینٹر ہے۔ یہاں سے آپ تعلیم ہب کی تمام خصوصیات تک رسائی حاصل کر سکتے ہیں۔'
    },
    steps: [
      {
        title: { en: 'Understanding Your Dashboard', ur: 'اپنے ڈیش بورڈ کو سمجھیں' },
        description: {
          en: 'The dashboard shows quick access cards for different features. Each card represents a different section of the app. Tap any card to open that section.',
          ur: 'ڈیش بورڈ مختلف خصوصیات کے لیے فوری رسائی کارڈز دکھاتا ہے۔ ہر کارڈ ایپ کے ایک مختلف حصے کی نمائندگی کرتا ہے۔ اس حصے کو کھولنے کے لیے کسی بھی کارڈ پر ٹیپ کریں۔'
        }
      },
      {
        title: { en: 'Leave Calendar', ur: 'چھٹی کیلنڈر' },
        description: {
          en: 'Tap the "Leave Calendar" card to view and manage staff leave records. You can see which staff members are on leave and add new leave entries.',
          ur: '"چھٹی کیلنڈر" کارڈ پر ٹیپ کریں تاکہ عملے کی چھٹیوں کے ریکارڈ دیکھ سکیں اور ان کا انتظام کر سکیں۔ آپ دیکھ سکتے ہیں کہ کون سے عملے کے ارکان چھٹی پر ہیں اور نئی چھٹی کے اندراجات شامل کر سکتے ہیں۔'
        },
        tip: {
          en: 'All leaves are automatically approved - no approval workflow needed.',
          ur: 'تمام چھٹیاں خودکار طور پر منظور ہو جاتی ہیں - کسی منظوری کے عمل کی ضرورت نہیں۔'
        }
      },
      {
        title: { en: 'Data Requests', ur: 'ڈیٹا کی درخواستیں' },
        description: {
          en: 'Access data collection requests from your supervisors. View pending requests, fill in required information, and submit your responses before the deadline.',
          ur: 'اپنے سپروائزرز کی طرف سے ڈیٹا جمع کرنے کی درخواستوں تک رسائی حاصل کریں۔ زیر التوا درخواستیں دیکھیں، مطلوبہ معلومات پُر کریں اور آخری تاریخ سے پہلے اپنے جوابات جمع کریں۔'
        }
      },
      {
        title: { en: 'School Visits', ur: 'اسکول دورے' },
        description: {
          en: 'For AEOs and supervisors: Record and track school visits including monitoring visits, mentoring sessions, and office activities.',
          ur: 'AEOs اور سپروائزرز کے لیے: اسکول کے دوروں کا ریکارڈ رکھیں بشمول نگرانی کے دورے، رہنمائی کے سیشنز اور دفتری سرگرمیاں۔'
        }
      },
      {
        title: { en: 'Profile & Settings', ur: 'پروفائل اور ترتیبات' },
        description: {
          en: 'Tap the profile icon in the top-right corner to view your account details, change theme (light/dark mode), or logout from the app.',
          ur: 'اپنے اکاؤنٹ کی تفصیلات دیکھنے، تھیم تبدیل کرنے (لائٹ/ڈارک موڈ) یا ایپ سے لاگ آؤٹ کرنے کے لیے اوپر دائیں کونے میں پروفائل آئیکن پر ٹیپ کریں۔'
        }
      },
    ],
  },
  '/calendar': {
    screenName: { en: 'Leave Calendar', ur: 'چھٹی کیلنڈر' },
    introduction: {
      en: 'The Leave Calendar helps you track and manage staff absences. All leaves are automatically approved.',
      ur: 'چھٹی کیلنڈر آپ کو عملے کی غیر حاضریوں کو ٹریک اور منظم کرنے میں مدد کرتا ہے۔ تمام چھٹیاں خودکار طور پر منظور ہو جاتی ہیں۔'
    },
    steps: [
      {
        title: { en: 'Viewing the Calendar', ur: 'کیلنڈر دیکھنا' },
        description: {
          en: 'The calendar shows the current month with colored dots indicating leave days. Different colors represent different leave types. Use the arrow buttons at the top to navigate between months.',
          ur: 'کیلنڈر موجودہ مہینہ دکھاتا ہے جس میں رنگین نقطے چھٹی کے دنوں کی نشاندہی کرتے ہیں۔ مختلف رنگ مختلف اقسام کی چھٹیوں کی نمائندگی کرتے ہیں۔ مہینوں کے درمیان جانے کے لیے اوپر تیر کے بٹن استعمال کریں۔'
        }
      },
      {
        title: { en: 'How to Add a Leave', ur: 'چھٹی کیسے شامل کریں' },
        description: {
          en: 'To add a new leave record, simply TAP on the date when the leave occurred. A form will appear where you can fill in the details. For Teachers: just tap the calendar date. For Head Teachers/AEOs: you can also use the "Add Leave" button.',
          ur: 'نئی چھٹی کا ریکارڈ شامل کرنے کے لیے صرف اس تاریخ پر ٹیپ کریں جب چھٹی ہوئی۔ ایک فارم ظاہر ہوگا جہاں آپ تفصیلات پُر کر سکتے ہیں۔ اساتذہ کے لیے: بس کیلنڈر کی تاریخ پر ٹیپ کریں۔ ہیڈ ٹیچرز/AEOs کے لیے: آپ "چھٹی شامل کریں" بٹن بھی استعمال کر سکتے ہیں۔'
        },
        tip: {
          en: 'Tap directly on a date to add leave for that day.',
          ur: 'اس دن کی چھٹی شامل کرنے کے لیے تاریخ پر براہ راست ٹیپ کریں۔'
        }
      },
      {
        title: { en: 'Filling the Leave Form', ur: 'چھٹی کا فارم پُر کرنا' },
        description: {
          en: 'When adding a leave: 1) Select the staff member name, 2) Choose the leave type (Casual/Sick/Earned/Special), 3) Select start and end dates, 4) Add any notes if needed, 5) Tap "Add Leave" to save.',
          ur: 'چھٹی شامل کرتے وقت: 1) عملے کے رکن کا نام منتخب کریں، 2) چھٹی کی قسم منتخب کریں (عارضی/بیماری/کمائی ہوئی/خصوصی)، 3) شروع اور اختتام کی تاریخیں منتخب کریں، 4) ضرورت ہو تو کوئی نوٹ شامل کریں، 5) محفوظ کرنے کے لیے "چھٹی شامل کریں" پر ٹیپ کریں۔'
        }
      },
      {
        title: { en: 'Leave Types Explained', ur: 'چھٹی کی اقسام کی وضاحت' },
        description: {
          en: 'CASUAL (عارضی): For personal matters, short notice leaves. SICK (بیماری): When unwell, may need medical certificate. EARNED (کمائی ہوئی): Pre-planned vacation leave. SPECIAL (خصوصی): For special circumstances like maternity, emergency, etc.',
          ur: 'عارضی: ذاتی معاملات، مختصر نوٹس والی چھٹیاں۔ بیماری: جب طبیعت خراب ہو، طبی سرٹیفکیٹ درکار ہو سکتا ہے۔ کمائی ہوئی: پہلے سے منصوبہ بند چھٹی۔ خصوصی: خاص حالات جیسے زچگی، ایمرجنسی وغیرہ کے لیے۔'
        }
      },
      {
        title: { en: 'Understanding the Guide Legend', ur: 'گائیڈ لیجنڈ کو سمجھنا' },
        description: {
          en: 'At the bottom of the calendar, you will see a color guide showing what each color means. Green = Casual, Blue = Sick, Purple = Earned, Orange = Special. This helps you quickly identify leave types at a glance.',
          ur: 'کیلنڈر کے نیچے آپ کو ایک رنگین گائیڈ نظر آئے گا جو بتاتا ہے کہ ہر رنگ کا کیا مطلب ہے۔ سبز = عارضی، نیلا = بیماری، جامنی = کمائی ہوئی، نارنجی = خصوصی۔ یہ آپ کو ایک نظر میں چھٹی کی اقسام پہچاننے میں مدد کرتا ہے۔'
        }
      },
      {
        title: { en: 'Viewing Leave Details', ur: 'چھٹی کی تفصیلات دیکھنا' },
        description: {
          en: 'Tap on any date with a colored dot to see the details of leaves on that day. You can view who is on leave, the type of leave, and any notes that were added.',
          ur: 'رنگین نقطے والی کسی بھی تاریخ پر ٹیپ کریں تاکہ اس دن کی چھٹیوں کی تفصیلات دیکھ سکیں۔ آپ دیکھ سکتے ہیں کہ کون چھٹی پر ہے، چھٹی کی قسم اور کوئی نوٹ جو شامل کیے گئے تھے۔'
        }
      },
    ],
  },
  '/data-requests': {
    screenName: { en: 'Data Requests', ur: 'ڈیٹا کی درخواستیں' },
    introduction: {
      en: 'Data Requests allow supervisors to collect information from staff. You will receive requests and need to respond before the deadline.',
      ur: 'ڈیٹا کی درخواستیں سپروائزرز کو عملے سے معلومات جمع کرنے کی اجازت دیتی ہیں۔ آپ کو درخواستیں موصول ہوں گی اور آخری تاریخ سے پہلے جواب دینا ہوگا۔'
    },
    steps: [
      {
        title: { en: 'Viewing Your Requests', ur: 'اپنی درخواستیں دیکھنا' },
        description: {
          en: 'This screen shows all data requests assigned to you. Each request card shows: the title, who sent it, deadline date, and current status (pending/submitted). Pending requests need your attention.',
          ur: 'یہ اسکرین آپ کو تفویض کردہ تمام ڈیٹا کی درخواستیں دکھاتی ہے۔ ہر درخواست کارڈ دکھاتا ہے: عنوان، کس نے بھیجی، آخری تاریخ اور موجودہ حیثیت (زیر التوا/جمع کرائی گئی)۔ زیر التوا درخواستوں پر توجہ درکار ہے۔'
        }
      },
      {
        title: { en: 'Filtering Requests', ur: 'درخواستیں فلٹر کرنا' },
        description: {
          en: 'Use the filter buttons at the top to view: ALL requests, only PENDING (not yet submitted), or only SUBMITTED requests. This helps you focus on what needs to be done.',
          ur: 'اوپر فلٹر بٹن استعمال کریں: تمام درخواستیں، صرف زیر التوا (ابھی تک جمع نہیں کرائی گئیں)، یا صرف جمع کرائی گئی درخواستیں دیکھنے کے لیے۔ یہ آپ کو اس بات پر توجہ مرکوز کرنے میں مدد کرتا ہے کہ کیا کرنا ہے۔'
        }
      },
      {
        title: { en: 'Opening a Request', ur: 'درخواست کھولنا' },
        description: {
          en: 'Tap on any request card to open it and see the full details. You will see all the fields that need to be filled and any instructions from your supervisor.',
          ur: 'کسی بھی درخواست کارڈ پر ٹیپ کریں تاکہ اسے کھول سکیں اور مکمل تفصیلات دیکھ سکیں۔ آپ تمام وہ خانے دیکھیں گے جو پُر کرنے ہیں اور اپنے سپروائزر کی کوئی ہدایات۔'
        }
      },
      {
        title: { en: 'Submitting Your Response', ur: 'اپنا جواب جمع کرانا' },
        description: {
          en: 'Fill in all required fields carefully. Upload any requested files or photos. When complete, tap the "Submit" button. Once submitted, you cannot make changes.',
          ur: 'تمام مطلوبہ خانے احتیاط سے پُر کریں۔ کوئی بھی مطلوبہ فائلیں یا تصاویر اپ لوڈ کریں۔ مکمل ہونے پر "جمع کریں" بٹن پر ٹیپ کریں۔ ایک بار جمع کرانے کے بعد آپ تبدیلیاں نہیں کر سکتے۔'
        },
        tip: {
          en: 'Submit before the deadline to avoid missing the request.',
          ur: 'درخواست چھوٹنے سے بچنے کے لیے آخری تاریخ سے پہلے جمع کریں۔'
        }
      },
      {
        title: { en: 'Deadlines are Important', ur: 'آخری تاریخیں اہم ہیں' },
        description: {
          en: 'Each request has a deadline shown in red or orange. Make sure to submit your response before this date. After the deadline, you may not be able to submit.',
          ur: 'ہر درخواست کی آخری تاریخ سرخ یا نارنجی میں دکھائی جاتی ہے۔ یقینی بنائیں کہ اس تاریخ سے پہلے اپنا جواب جمع کر دیں۔ آخری تاریخ کے بعد آپ شاید جمع نہ کر سکیں۔'
        }
      },
    ],
  },
  '/create-request': {
    screenName: { en: 'Create Data Request', ur: 'ڈیٹا کی درخواست بنائیں' },
    introduction: {
      en: 'Create a new data collection request to gather information from your team members.',
      ur: 'اپنی ٹیم کے اراکین سے معلومات جمع کرنے کے لیے نئی ڈیٹا جمع کرنے کی درخواست بنائیں۔'
    },
    steps: [
      {
        title: { en: 'Step 1: Request Title', ur: 'مرحلہ 1: درخواست کا عنوان' },
        description: {
          en: 'Enter a clear, descriptive title for your request. This helps recipients understand what data you are collecting. Example: "Monthly Attendance Report" or "Student Enrollment Update".',
          ur: 'اپنی درخواست کے لیے واضح، وضاحتی عنوان درج کریں۔ یہ وصول کنندگان کو سمجھنے میں مدد کرتا ہے کہ آپ کون سا ڈیٹا جمع کر رہے ہیں۔ مثال: "ماہانہ حاضری رپورٹ" یا "طالب علم داخلہ اپ ڈیٹ"۔'
        }
      },
      {
        title: { en: 'Step 2: Add Data Fields', ur: 'مرحلہ 2: ڈیٹا فیلڈز شامل کریں' },
        description: {
          en: 'Add the fields you need. Choose field types like: Text (for names/descriptions), Number (for counts/amounts), Date (for dates), File (for documents/photos). Each field can be marked as required or optional.',
          ur: 'وہ خانے شامل کریں جو آپ کو چاہئیں۔ فیلڈ کی اقسام منتخب کریں جیسے: ٹیکسٹ (ناموں/تفصیل کے لیے)، نمبر (گنتی/رقم کے لیے)، تاریخ (تاریخوں کے لیے)، فائل (دستاویزات/تصاویر کے لیے)۔ ہر فیلڈ کو لازمی یا اختیاری کے طور پر نشان زد کیا جا سکتا ہے۔'
        }
      },
      {
        title: { en: 'Step 3: Set Deadline', ur: 'مرحلہ 3: آخری تاریخ مقرر کریں' },
        description: {
          en: 'Choose when responses are due. Give recipients enough time to collect and submit their data. You can select the date and time from the calendar picker.',
          ur: 'منتخب کریں کہ جوابات کب تک آنے چاہئیں۔ وصول کنندگان کو اپنا ڈیٹا جمع کرنے اور جمع کرانے کے لیے کافی وقت دیں۔ آپ کیلنڈر پیکر سے تاریخ اور وقت منتخب کر سکتے ہیں۔'
        }
      },
      {
        title: { en: 'Step 4: Select Recipients', ur: 'مرحلہ 4: وصول کنندگان منتخب کریں' },
        description: {
          en: 'Choose who should receive this request. You can select individual users, all users in a school, or all users in your area. Only users under your supervision will appear.',
          ur: 'منتخب کریں کہ کس کو یہ درخواست ملنی چاہیے۔ آپ انفرادی صارفین، کسی اسکول کے تمام صارفین، یا اپنے علاقے کے تمام صارفین کو منتخب کر سکتے ہیں۔ صرف آپ کی نگرانی میں آنے والے صارفین ظاہر ہوں گے۔'
        }
      },
      {
        title: { en: 'Step 5: Review and Send', ur: 'مرحلہ 5: جائزہ لیں اور بھیجیں' },
        description: {
          en: 'Review all details before sending. Once sent, recipients will be notified and can start submitting their responses. You can track responses in the Data Requests section.',
          ur: 'بھیجنے سے پہلے تمام تفصیلات کا جائزہ لیں۔ بھیجنے کے بعد وصول کنندگان کو مطلع کیا جائے گا اور وہ اپنے جوابات جمع کرانا شروع کر سکتے ہیں۔ آپ ڈیٹا کی درخواستوں کے سیکشن میں جوابات کو ٹریک کر سکتے ہیں۔'
        }
      },
    ],
  },
  '/school-visits': {
    screenName: { en: 'School Visits', ur: 'اسکول دورے' },
    introduction: {
      en: 'Record and track your school visits for monitoring, mentoring, and office activities.',
      ur: 'نگرانی، رہنمائی اور دفتری سرگرمیوں کے لیے اپنے اسکول کے دوروں کا ریکارڈ رکھیں اور ٹریک کریں۔'
    },
    steps: [
      {
        title: { en: 'Types of Visits', ur: 'دوروں کی اقسام' },
        description: {
          en: 'There are three types of visits: MONITORING (نگرانی) - Regular school inspections, MENTORING (رہنمائی) - Teacher coaching sessions, OFFICE (دفتر) - Office-based activities. Each type has its own form and requirements.',
          ur: 'دوروں کی تین اقسام ہیں: نگرانی - باقاعدہ اسکول معائنہ، رہنمائی - اساتذہ کی کوچنگ سیشنز، دفتر - دفتر میں سرگرمیاں۔ ہر قسم کا اپنا فارم اور تقاضے ہیں۔'
        }
      },
      {
        title: { en: 'Starting a New Visit', ur: 'نیا دورہ شروع کرنا' },
        description: {
          en: 'Tap "New Visit" and select the visit type. Choose the school you are visiting from the dropdown. The system will record your arrival time automatically.',
          ur: '"نیا دورہ" پر ٹیپ کریں اور دورے کی قسم منتخب کریں۔ ڈراپ ڈاؤن سے وہ اسکول منتخب کریں جہاں آپ جا رہے ہیں۔ سسٹم خودکار طور پر آپ کے پہنچنے کا وقت ریکارڈ کرے گا۔'
        }
      },
      {
        title: { en: 'Filling Visit Details', ur: 'دورے کی تفصیلات پُر کرنا' },
        description: {
          en: 'Complete all required fields during your visit. This includes teacher attendance, student count, facility conditions, classroom observations, and any issues found. Be accurate and thorough.',
          ur: 'اپنے دورے کے دوران تمام مطلوبہ خانے پُر کریں۔ اس میں اساتذہ کی حاضری، طلباء کی تعداد، سہولیات کی حالت، کلاس روم کے مشاہدات اور کوئی بھی مسائل شامل ہیں۔ درست اور مکمل ہوں۔'
        }
      },
      {
        title: { en: 'Adding Evidence Photos', ur: 'ثبوت کی تصاویر شامل کرنا' },
        description: {
          en: 'Take photos as evidence of your visit. Tap "Add Photo" to capture or upload images. Photos help verify your visit and document conditions at the school.',
          ur: 'اپنے دورے کے ثبوت کے طور پر تصاویر لیں۔ تصاویر کھینچنے یا اپ لوڈ کرنے کے لیے "تصویر شامل کریں" پر ٹیپ کریں۔ تصاویر آپ کے دورے کی تصدیق کرنے اور اسکول میں حالات کی دستاویز کرنے میں مدد کرتی ہیں۔'
        },
        tip: {
          en: 'Take clear photos of classrooms, facilities, and any issues you find.',
          ur: 'کلاس رومز، سہولیات اور کسی بھی مسئلے کی واضح تصاویر لیں۔'
        }
      },
      {
        title: { en: 'Submitting Your Visit', ur: 'اپنا دورہ جمع کرانا' },
        description: {
          en: 'When you complete your visit, record your departure time and tap "Submit". Your visit will be saved and visible to your supervisors. Once submitted, changes cannot be made.',
          ur: 'جب آپ اپنا دورہ مکمل کر لیں، اپنے جانے کا وقت ریکارڈ کریں اور "جمع کریں" پر ٹیپ کریں۔ آپ کا دورہ محفوظ ہو جائے گا اور آپ کے سپروائزرز کو نظر آئے گا۔ ایک بار جمع کرانے کے بعد تبدیلیاں نہیں کی جا سکتیں۔'
        }
      },
    ],
  },
  '/school-data': {
    screenName: { en: 'School Information', ur: 'اسکول کی معلومات' },
    introduction: {
      en: 'View and manage your school\'s information, inventory, and statistics.',
      ur: 'اپنے اسکول کی معلومات، انوینٹری اور اعداد و شمار دیکھیں اور ان کا انتظام کریں۔'
    },
    steps: [
      {
        title: { en: 'School Profile', ur: 'اسکول کا پروفائل' },
        description: {
          en: 'View your school\'s basic information including EMIS code, name, address, and contact details. This information comes from the official records.',
          ur: 'اپنے اسکول کی بنیادی معلومات دیکھیں بشمول EMIS کوڈ، نام، پتہ اور رابطے کی تفصیلات۔ یہ معلومات سرکاری ریکارڈ سے آتی ہیں۔'
        }
      },
      {
        title: { en: 'Staff and Students', ur: 'عملہ اور طلباء' },
        description: {
          en: 'See the count of teachers and students at your school. This includes current enrollment numbers and staff positions.',
          ur: 'اپنے اسکول میں اساتذہ اور طلباء کی تعداد دیکھیں۔ اس میں موجودہ داخلہ نمبر اور عملے کی پوزیشنیں شامل ہیں۔'
        }
      },
      {
        title: { en: 'Inventory Management', ur: 'انوینٹری کا انتظام' },
        description: {
          en: 'Track school furniture, equipment, and supplies. Record items like desks, chairs, whiteboards, computers, and other resources. Update counts as items are added or removed.',
          ur: 'اسکول کے فرنیچر، آلات اور سامان کو ٹریک کریں۔ ڈیسک، کرسیاں، وائٹ بورڈز، کمپیوٹرز اور دیگر وسائل جیسی اشیاء کا ریکارڈ رکھیں۔ اشیاء شامل ہونے یا ہٹانے پر تعداد اپ ڈیٹ کریں۔'
        }
      },
      {
        title: { en: 'Editing School Data', ur: 'اسکول کا ڈیٹا ایڈٹ کرنا' },
        description: {
          en: 'If you have permission, tap "Edit" to update school information. Changes are tracked and may require approval from your supervisor.',
          ur: 'اگر آپ کے پاس اجازت ہے تو اسکول کی معلومات اپ ڈیٹ کرنے کے لیے "ایڈٹ" پر ٹیپ کریں۔ تبدیلیاں ٹریک کی جاتی ہیں اور آپ کے سپروائزر سے منظوری کی ضرورت ہو سکتی ہے۔'
        }
      },
    ],
  },
  '/profile': {
    screenName: { en: 'Your Profile', ur: 'آپ کا پروفائل' },
    introduction: {
      en: 'View your account details and manage app settings.',
      ur: 'اپنے اکاؤنٹ کی تفصیلات دیکھیں اور ایپ کی ترتیبات کا انتظام کریں۔'
    },
    steps: [
      {
        title: { en: 'Your Information', ur: 'آپ کی معلومات' },
        description: {
          en: 'View your name, phone number, role, and school assignment. This information was set during registration and is linked to official records.',
          ur: 'اپنا نام، فون نمبر، کردار اور اسکول کی تفویض دیکھیں۔ یہ معلومات رجسٹریشن کے دوران مقرر کی گئی تھیں اور سرکاری ریکارڈ سے منسلک ہیں۔'
        }
      },
      {
        title: { en: 'Theme Settings', ur: 'تھیم کی ترتیبات' },
        description: {
          en: 'Switch between Light Mode (bright background) and Dark Mode (dark background) based on your preference. Dark mode is easier on the eyes in low light.',
          ur: 'اپنی پسند کے مطابق لائٹ موڈ (روشن پس منظر) اور ڈارک موڈ (گہرا پس منظر) کے درمیان سوئچ کریں۔ کم روشنی میں ڈارک موڈ آنکھوں کے لیے آسان ہے۔'
        }
      },
      {
        title: { en: 'Logging Out', ur: 'لاگ آؤٹ کرنا' },
        description: {
          en: 'Tap "Logout" to sign out of your account. You will need to enter your phone number and password again to log back in. Logout when using shared devices.',
          ur: 'اپنے اکاؤنٹ سے سائن آؤٹ کرنے کے لیے "لاگ آؤٹ" پر ٹیپ کریں۔ دوبارہ لاگ ان کرنے کے لیے آپ کو اپنا فون نمبر اور پاس ورڈ دوبارہ درج کرنا ہوگا۔ مشترکہ ڈیوائسز استعمال کرتے وقت لاگ آؤٹ کریں۔'
        },
        tip: {
          en: 'Always logout when using someone else\'s device.',
          ur: 'دوسرے کی ڈیوائس استعمال کرتے وقت ہمیشہ لاگ آؤٹ کریں۔'
        }
      },
    ],
  },
  '/user-management': {
    screenName: { en: 'User Management', ur: 'صارف کا انتظام' },
    introduction: {
      en: 'Manage users in your area of responsibility. View, filter, and access user profiles.',
      ur: 'اپنے ذمہ داری کے علاقے میں صارفین کا انتظام کریں۔ صارف پروفائلز دیکھیں، فلٹر کریں اور رسائی حاصل کریں۔'
    },
    steps: [
      {
        title: { en: 'Viewing Users', ur: 'صارفین دیکھنا' },
        description: {
          en: 'See all users under your supervision. The list shows their name, role, school, and account status. You can only see users in your assigned area.',
          ur: 'اپنی نگرانی میں تمام صارفین دیکھیں۔ فہرست ان کا نام، کردار، اسکول اور اکاؤنٹ کی حیثیت دکھاتی ہے۔ آپ صرف اپنے تفویض کردہ علاقے کے صارفین دیکھ سکتے ہیں۔'
        }
      },
      {
        title: { en: 'Filtering Users', ur: 'صارفین کو فلٹر کرنا' },
        description: {
          en: 'Use filters to find specific users. Filter by role (Teacher, Head Teacher, etc.), by school, or by district. This helps you quickly find the person you need.',
          ur: 'مخصوص صارفین تلاش کرنے کے لیے فلٹرز استعمال کریں۔ کردار (استاد، ہیڈ ٹیچر وغیرہ)، اسکول یا ضلع کے لحاظ سے فلٹر کریں۔ یہ آپ کو جس شخص کی ضرورت ہے جلدی تلاش کرنے میں مدد کرتا ہے۔'
        }
      },
      {
        title: { en: 'User Details', ur: 'صارف کی تفصیلات' },
        description: {
          en: 'Tap on any user to view their complete profile. See their contact information, assigned school, and activity history.',
          ur: 'ان کا مکمل پروفائل دیکھنے کے لیے کسی بھی صارف پر ٹیپ کریں۔ ان کی رابطے کی معلومات، تفویض کردہ اسکول اور سرگرمی کی تاریخ دیکھیں۔'
        }
      },
    ],
  },
  '/queries': {
    screenName: { en: 'Queries & Questions', ur: 'سوالات اور استفسارات' },
    introduction: {
      en: 'Submit questions or issues and track responses from your supervisors.',
      ur: 'سوالات یا مسائل جمع کریں اور اپنے سپروائزرز کے جوابات کو ٹریک کریں۔'
    },
    steps: [
      {
        title: { en: 'Viewing Your Queries', ur: 'اپنے سوالات دیکھنا' },
        description: {
          en: 'See all queries you have submitted and their current status. Pending queries are waiting for response. Resolved queries have been answered.',
          ur: 'آپ نے جمع کرائے ہوئے تمام سوالات اور ان کی موجودہ حیثیت دیکھیں۔ زیر التوا سوالات جواب کے منتظر ہیں۔ حل شدہ سوالات کا جواب دے دیا گیا ہے۔'
        }
      },
      {
        title: { en: 'Creating a New Query', ur: 'نیا سوال بنانا' },
        description: {
          en: 'Tap "Create Query" to submit a new question or issue. Describe your problem clearly so your supervisor can understand and help. Add any relevant details.',
          ur: 'نیا سوال یا مسئلہ جمع کرنے کے لیے "سوال بنائیں" پر ٹیپ کریں۔ اپنے مسئلے کو واضح طور پر بیان کریں تاکہ آپ کا سپروائزر سمجھ سکے اور مدد کر سکے۔ کوئی بھی متعلقہ تفصیلات شامل کریں۔'
        }
      },
      {
        title: { en: 'Tracking Responses', ur: 'جوابات کو ٹریک کرنا' },
        description: {
          en: 'Check back regularly for responses to your queries. When a supervisor responds, you will see their answer in the query details. You can reply to continue the conversation.',
          ur: 'اپنے سوالات کے جوابات کے لیے باقاعدگی سے چیک کریں۔ جب کوئی سپروائزر جواب دے تو آپ کو سوال کی تفصیلات میں ان کا جواب نظر آئے گا۔ آپ گفتگو جاری رکھنے کے لیے جواب دے سکتے ہیں۔'
        }
      },
    ],
  },
  '/collaborative-forms': {
    screenName: { en: 'Collaborative Forms', ur: 'اشتراکی فارمز' },
    introduction: {
      en: 'Participate in collaborative data collection forms where multiple users contribute.',
      ur: 'اشتراکی ڈیٹا جمع کرنے کے فارمز میں شریک ہوں جہاں متعدد صارفین شراکت کرتے ہیں۔'
    },
    steps: [
      {
        title: { en: 'Available Forms', ur: 'دستیاب فارمز' },
        description: {
          en: 'See all collaborative forms you can participate in. Each form shows its title, description, and deadline. Tap a form to start filling it.',
          ur: 'تمام اشتراکی فارمز دیکھیں جن میں آپ شریک ہو سکتے ہیں۔ ہر فارم اپنا عنوان، تفصیل اور آخری تاریخ دکھاتا ہے۔ اسے پُر کرنا شروع کرنے کے لیے فارم پر ٹیپ کریں۔'
        }
      },
      {
        title: { en: 'Filling a Form', ur: 'فارم پُر کرنا' },
        description: {
          en: 'Enter your data in the form fields. Your responses are combined with others to create a complete picture. Submit when you have completed all required fields.',
          ur: 'فارم کے خانوں میں اپنا ڈیٹا درج کریں۔ آپ کے جوابات دوسروں کے ساتھ مل کر ایک مکمل تصویر بناتے ہیں۔ تمام مطلوبہ خانے مکمل کرنے کے بعد جمع کریں۔'
        }
      },
      {
        title: { en: 'Viewing Responses', ur: 'جوابات دیکھنا' },
        description: {
          en: 'See how others have responded (if allowed). This helps you understand the overall picture and ensures consistency in data collection.',
          ur: 'دیکھیں کہ دوسروں نے کیسے جواب دیا ہے (اگر اجازت ہو)۔ یہ آپ کو مجموعی تصویر سمجھنے اور ڈیٹا جمع کرنے میں مطابقت یقینی بنانے میں مدد کرتا ہے۔'
        }
      },
    ],
  },
};

const defaultGuide: ScreenGuide = {
  screenName: { en: 'Help', ur: 'مدد' },
  introduction: {
    en: 'Welcome to TaleemHub! Use this guide to learn how to use the app.',
    ur: 'تعلیم ہب میں خوش آمدید! ایپ استعمال کرنا سیکھنے کے لیے یہ گائیڈ استعمال کریں۔'
  },
  steps: [
    {
      title: { en: 'Navigation', ur: 'نیویگیشن' },
      description: {
        en: 'Use the back button or menu to move between screens. Tap on cards and buttons to access different features.',
        ur: 'اسکرینز کے درمیان جانے کے لیے واپس بٹن یا مینو استعمال کریں۔ مختلف خصوصیات تک رسائی کے لیے کارڈز اور بٹنوں پر ٹیپ کریں۔'
      }
    },
    {
      title: { en: 'Need More Help?', ur: 'مزید مدد چاہیے؟' },
      description: {
        en: 'If you need assistance, contact your supervisor or use the Queries section to submit a question.',
        ur: 'اگر آپ کو مدد کی ضرورت ہو تو اپنے سپروائزر سے رابطہ کریں یا سوال جمع کرنے کے لیے سوالات کا سیکشن استعمال کریں۔'
      }
    },
  ],
};

export function HelpGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [language, setLanguage] = useState<Language>('en');
  const [showIntro, setShowIntro] = useState(true);
  const [location] = useLocation();

  useEffect(() => {
    setCurrentStep(0);
    setShowIntro(true);
  }, [location]);

  const getGuide = (): ScreenGuide => {
    if (guides[location]) return guides[location];
    
    const pathParts = location.split('/');
    if (pathParts[1] === 'request') return guides['/data-requests'] || defaultGuide;
    if (pathParts[1] === 'visit') return guides['/school-visits'] || defaultGuide;
    if (pathParts[1] === 'query') return guides['/queries'] || defaultGuide;
    if (pathParts[1] === 'album') return guides['/school-data'] || defaultGuide;
    if (pathParts[1] === 'collaborative-form') return guides['/collaborative-forms'] || defaultGuide;
    
    return defaultGuide;
  };

  const currentGuide = getGuide();
  const steps = currentGuide.steps;

  const handleOpen = () => {
    setIsOpen(true);
    setCurrentStep(0);
    setShowIntro(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const startGuide = () => {
    setShowIntro(false);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setShowIntro(true);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  const hideOnPages = ['/', '/signup'];
  const shouldHideButton = hideOnPages.includes(location);

  return (
    <>
      {!shouldHideButton && (
        <button
          onClick={handleOpen}
          className="fixed bottom-20 right-4 z-[60] w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
          aria-label="Open Help Guide"
          data-testid="button-help-guide"
        >
          <BookOpen className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300 max-h-[85vh] flex flex-col"
            dir={language === 'ur' ? 'rtl' : 'ltr'}
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <h2 className="font-bold text-lg">
                    {language === 'en' ? 'Help Guide' : 'مدد گائیڈ'}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-sm font-medium transition-colors"
                    data-testid="button-toggle-language"
                  >
                    <Languages className="w-4 h-4" />
                    {language === 'en' ? 'اردو' : 'English'}
                  </button>
                  <button
                    onClick={handleClose}
                    className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Close"
                    data-testid="button-close-help"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-white/90 mt-1 font-medium">
                {currentGuide.screenName[language]}
              </p>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {showIntro ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {currentGuide.screenName[language]}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {currentGuide.introduction[language]}
                  </p>
                  <Button
                    onClick={startGuide}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8"
                    size="lg"
                  >
                    {language === 'en' ? 'Start Guide' : 'گائیڈ شروع کریں'}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    {language === 'en' 
                      ? `${steps.length} steps to learn this feature`
                      : `اس خصوصیت کو سیکھنے کے لیے ${steps.length} مراحل`}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {currentStep + 1}
                      </span>
                      <h3 className="font-bold text-lg text-foreground leading-tight pt-1">
                        {steps[currentStep]?.title[language]}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-base mb-4 pl-11">
                      {steps[currentStep]?.description[language]}
                    </p>
                    {steps[currentStep]?.tip && (
                      <div className="ml-11 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          <span className="font-semibold">{language === 'en' ? '💡 Tip: ' : '💡 ٹپ: '}</span>
                          {steps[currentStep]?.tip?.[language]}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-1.5 mb-6">
                    {steps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentStep(idx)}
                        className={`h-2 flex-1 rounded-full transition-all ${
                          idx === currentStep 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                            : idx < currentStep 
                              ? 'bg-blue-300 dark:bg-blue-700' 
                              : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevStep}
                      className="gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      {language === 'en' ? 'Back' : 'واپس'}
                    </Button>
                    <span className="text-sm text-muted-foreground font-medium">
                      {currentStep + 1} / {steps.length}
                    </span>
                    <Button
                      size="sm"
                      onClick={nextStep}
                      className="gap-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      {currentStep === steps.length - 1 
                        ? (language === 'en' ? 'Done' : 'مکمل') 
                        : (language === 'en' ? 'Next' : 'اگلا')}
                      {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
