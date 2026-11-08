
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AppContext = createContext(null);

const translations = {
  en: {
    home: "Home",
    admin: "Admin",
    custom: "Custom Design",
    contact: "Contact",
    explore: "Explore our collections",
    subtitle: "Furniture made for beautiful living.",
    shop: "Explore Collection",
    customize: "Create Your Own Design",
    quick: "Quick View",
    add: "Add to Cart",
    other: "Explore Other Collections",
    request: "Request Custom Design",
    name: "Your Full Name",
    phone: "Phone Number",
    submit: "Submit Request",
    cancel: "Cancel",
    next: "Continue",
    back: "Back",
    close: "Close",
    success: "Your request was submitted successfully!",
    cartSuccess: "Your order has been submitted!",
    orderReceived: "Your furniture order has been received!",
    designReceived: "Your custom design request has been received!",
    length: "Length",
    width: "Width",
    color: "Preferred Color",
    appointment: "Appointment Date",
    photo: "Reference Picture (Optional)",
    notes: "Additional Details (Optional)",
    type: "Choose Furniture Type",
    login: "Admin Sign In",
    dashboard: "Admin Dashboard",
    orders: "Furniture Orders",
    designs: "Custom Designs",
    price: "Price",
    quantity: "Quantity",
    email: "Email Address",
    password: "Password",
    send: "Send Message",
    message: "Your Message",
    empty: "No submissions yet.",
    logout: "Sign Out",

    welcome: "Welcome to FurniHouse Ethiopia",
    heroTitle: "Beautiful Furniture for Beautiful Living",
    heroDescription: "Discover elegant furniture designed to make your home comfortable, stylish and welcoming.",
    collections: "Our Collections",
    collectionsDescription: "Find the perfect furniture for every corner of your home.",
    whyUs: "Why Choose FurniHouse?",
    quality: "Quality Craftsmanship",
    qualityDescription: "Carefully made furniture with attention to detail.",
    modern: "Modern Designs",
    modernDescription: "Beautiful designs that complement your home.",
    service: "Customer Care",
    serviceDescription: "We are here to help you find your perfect furniture.",
    learnMore: "Learn More",
    viewAll: "View All",
    viewDetails: "View Details",
    allProducts: "All Products",
    sofas: "Sofas",
    chairs: "Chairs & Tables",
    beds: "Beds",
    doors: "Doors",
    available: "Available",
    unavailable: "Unavailable",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    productDetails: "Product Details",
    description: "Description",
    category: "Category",
    total: "Total",
    subtotal: "Subtotal",
    cart: "Shopping Bag",
    emptyCart: "Your shopping bag is empty.",
    continueShopping: "Continue Shopping",
    remove: "Remove",
    update: "Update",
    checkout: "Proceed to Checkout",
    customerInfo: "Customer Information",
    deliveryAddress: "Delivery Address",
    address: "Your Address",
    city: "City",
    orderNow: "Place Order",
    orderSuccess: "Your order has been placed successfully!",
    orderHistory: "Order History",
    noOrders: "You have no orders yet.",
    contactTitle: "Get in Touch",
    contactDescription: "Have a question? We would love to hear from you.",
    subject: "Subject",
    sending: "Sending...",
    messageSuccess: "Your message has been sent successfully!",
    required: "This field is required.",
    invalidEmail: "Please enter a valid email address.",
    chooseLanguage: "Choose Language",
    customTitle: "Design Furniture Your Way",
    customDescription: "Tell us what you imagine and let us help bring your design to life.",
    step: "Step",
    review: "Review Your Request",
    upload: "Upload Image",
    selectType: "Select Furniture Type",
    dimensions: "Furniture Dimensions",
    finish: "Finishing Details",
    colorPlaceholder: "Enter your preferred color",
    adminWelcome: "Welcome back",
    adminSubtitle: "Manage your furniture orders and custom requests.",
    pending: "Pending",
    approved: "Approved",
    completed: "Completed",
    rejected: "Rejected",
    all: "All",
    noDesigns: "No custom design requests yet.",
    noCustomerOrders: "No furniture orders yet.",
    customer: "Customer",
    date: "Date",
    status: "Status",
    actions: "Actions",
    confirm: "Confirm",
    delete: "Delete",
    search: "Search products...",
    filter: "Filter by category",
    sort: "Sort by",
    newest: "Newest",
    lowestPrice: "Lowest Price",
    highestPrice: "Highest Price",
    footerText: "Beautiful furniture. Beautiful living.",
    rights: "All rights reserved.",
    about: "About Us",
    homeFurniture: "Furniture for Every Home",
    orderReceived: "Your furniture order has been received!",
    designReceived: "Your custom design request has been received!",
  },

  am: {
    home: "መነሻ",
    admin: "አስተዳዳሪ",
    custom: "የራስዎ ዲዛይን",
    contact: "ያግኙን",
    explore: "የእቃ ስብስቦቻችንን ይመልከቱ",
    subtitle: "ለውብ ኑሮ የተዘጋጁ የቤት እቃዎች።",
    shop: "ስብስቡን ይመልከቱ",
    customize: "የራስዎን ዲዛይን ይፍጠሩ",
    quick: "ፈጣን እይታ",
    add: "ወደ ትዕዛዝ ጨምር",
    other: "ሌሎች ስብስቦችን ይመልከቱ",
    request: "ብጁ ዲዛይን ይጠይቁ",
    name: "ሙሉ ስም",
    phone: "ስልክ ቁጥር",
    submit: "ጥያቄ ላክ",
    cancel: "ሰርዝ",
    next: "ቀጥል",
    back: "ተመለስ",
    close: "ዝጋ",
    success: "ጥያቄዎ በተሳካ ሁኔታ ተልኳል!",
    cartSuccess: "ትዕዛዝዎ ተልኳል!",
    orderReceived: "የቤት እቃ ትዕዛዝዎ ደርሶናል!",
    designReceived: "የብጁ ዲዛይን ጥያቄዎ ደርሶናል!",
    length: "ርዝመት",
    width: "ስፋት",
    color: "የሚፈልጉት ቀለም",
    appointment: "የቀጠሮ ቀን",
    photo: "የምስል ማጣቀሻ (አማራጭ)",
    notes: "ተጨማሪ ዝርዝሮች (አማራጭ)",
    type: "የእቃውን አይነት ይምረጡ",
    login: "የአስተዳዳሪ መግቢያ",
    dashboard: "የአስተዳዳሪ ገጽ",
    orders: "የእቃ ትዕዛዞች",
    designs: "ብጁ ዲዛይኖች",
    price: "ዋጋ",
    quantity: "ብዛት",
    email: "ኢሜይል አድራሻ",
    password: "የይለፍ ቃል",
    send: "መልዕክት ላክ",
    message: "መልዕክትዎ",
    empty: "እስካሁን ምንም ጥያቄ የለም።",
    logout: "ውጣ",

    welcome: "ወደ ፈርኒሃውስ ኢትዮጵያ እንኳን በደህና መጡ",
    heroTitle: "ለውብ ኑሮ የሚሆኑ ውብ የቤት እቃዎች",
    heroDescription: "ቤትዎን ምቹ፣ ዘመናዊ እና ማራኪ የሚያደርጉ የቤት እቃዎችን ያግኙ።",
    collections: "የእቃ ስብስቦቻችን",
    collectionsDescription: "ለቤትዎ ሁሉም ክፍሎች ተስማሚ የሆኑ እቃዎችን ያግኙ።",
    whyUs: "ለምን ፈርኒሃውስን ይመርጣሉ?",
    quality: "ጥራት ያለው አሰራር",
    qualityDescription: "ለዝርዝር ትኩረት ተሰጥቶ የተሰሩ የቤት እቃዎች።",
    modern: "ዘመናዊ ዲዛይኖች",
    modernDescription: "ከቤትዎ ጋር የሚስማሙ ውብ ዲዛይኖች።",
    service: "የደንበኞች አገልግሎት",
    serviceDescription: "ትክክለኛውን የቤት እቃ እንዲመርጡ እንረዳዎታለን።",
    learnMore: "ተጨማሪ ይወቁ",
    viewAll: "ሁሉንም ይመልከቱ",
    viewDetails: "ዝርዝሩን ይመልከቱ",
    allProducts: "ሁሉም እቃዎች",
    sofas: "ሶፋዎች",
    chairs: "ወንበሮች እና ጠረጴዛዎች",
    beds: "አልጋዎች",
    doors: "በሮች",
    available: "ይገኛል",
    unavailable: "አይገኝም",
    inStock: "በክምችት ይገኛል",
    outOfStock: "ከክምችት ውጭ",
    productDetails: "የእቃው ዝርዝር",
    description: "መግለጫ",
    category: "ምድብ",
    total: "ጠቅላላ",
    subtotal: "ንዑስ ድምር",
    cart: "የግዢ ቦርሳ",
    emptyCart: "የግዢ ቦርሳዎ ባዶ ነው።",
    continueShopping: "ግዢዎን ይቀጥሉ",
    remove: "አስወግድ",
    update: "አዘምን",
    checkout: "ወደ ክፍያ ይቀጥሉ",
    customerInfo: "የደንበኛ መረጃ",
    deliveryAddress: "የማድረሻ አድራሻ",
    address: "አድራሻዎ",
    city: "ከተማ",
    orderNow: "ትዕዛዝ ያስገቡ",
    orderSuccess: "ትዕዛዝዎ በተሳካ ሁኔታ ተቀምጧል!",
    orderHistory: "የትዕዛዝ ታሪክ",
    noOrders: "እስካሁን ምንም ትዕዛዝ የለዎትም።",
    contactTitle: "ያግኙን",
    contactDescription: "ጥያቄ አለዎት? እንሰማዎታለን።",
    subject: "ርዕስ",
    sending: "በመላክ ላይ...",
    messageSuccess: "መልዕክትዎ በተሳካ ሁኔታ ተልኳል!",
    required: "ይህ መስክ ያስፈልጋል።",
    invalidEmail: "እባክዎ ትክክለኛ ኢሜይል ያስገቡ።",
    chooseLanguage: "ቋንቋ ይምረጡ",
    customTitle: "የራስዎን የቤት እቃ ዲዛይን ይፍጠሩ",
    customDescription: "ያሰቡትን ይንገሩን፤ ዲዛይንዎን እውን እናደርጋለን።",
    step: "ደረጃ",
    review: "ጥያቄዎን ይመልከቱ",
    upload: "ምስል ይጫኑ",
    selectType: "የእቃውን አይነት ይምረጡ",
    dimensions: "የእቃው ልኬቶች",
    finish: "የማጠናቀቂያ ዝርዝሮች",
    colorPlaceholder: "የሚፈልጉትን ቀለም ያስገቡ",
    adminWelcome: "እንኳን ደህና መጡ",
    adminSubtitle: "የቤት እቃ ትዕዛዞችን እና ብጁ ጥያቄዎችን ያስተዳድሩ።",
    pending: "በመጠባበቅ ላይ",
    approved: "ጸድቋል",
    completed: "ተጠናቋል",
    rejected: "ውድቅ ተደርጓል",
    all: "ሁሉም",
    noDesigns: "እስካሁን የብጁ ዲዛይን ጥያቄ የለም።",
    noCustomerOrders: "እስካሁን የቤት እቃ ትዕዛዝ የለም።",
    customer: "ደንበኛ",
    date: "ቀን",
    status: "ሁኔታ",
    actions: "ድርጊቶች",
    confirm: "አረጋግጥ",
    delete: "ሰርዝ",
    search: "እቃዎችን ይፈልጉ...",
    filter: "በምድብ ይምረጡ",
    sort: "በዚህ ደረጃ ደርድር",
    newest: "አዲሶቹ",
    lowestPrice: "ዝቅተኛ ዋጋ",
    highestPrice: "ከፍተኛ ዋጋ",
    footerText: "ውብ የቤት እቃዎች። ውብ ኑሮ።",
    rights: "መብቱ በሙሉ የተጠበቀ ነው።",
    about: "ስለ እኛ",
    homeFurniture: "ለእያንዳንዱ ቤት የቤት እቃዎች",
  },

  om: {
    home: "Mana",
    admin: "Bulchaa",
    custom: "Dizaayinii Addaa",
    contact: "Nu Qunnamaa",
    explore: "Kuusaa keenya ilaalaa",
    subtitle: "Meeshaalee manaaf jireenya bareedaa uuman.",
    shop: "Kuusaa Ilaali",
    customize: "Dizaayinii Kee Uumi",
    quick: "Saffisaan Ilaali",
    add: "Ajaja irratti dabali",
    other: "Kuusaalee Biroo Ilaali",
    request: "Dizaayinii Addaa Gaafadhu",
    name: "Maqaa Guutuu",
    phone: "Lakkoofsa Bilbilaa",
    submit: "Gaaffii Ergi",
    cancel: "Haquu",
    next: "Itti Fufi",
    back: "Duubatti",
    close: "Cufi",
    success: "Gaaffiin kee milkaa'inaan ergameera!",
    cartSuccess: "Ajajni kee ergameera!",
    orderReceived: "Ajajni meeshaa manaa kee nu gaheera!",
    designReceived: "Gaaffiin dizaayinii addaa kee nu gaheera!",
    length: "Dheerina",
    width: "Bal'ina",
    color: "Halluu Filatame",
    appointment: "Guyyaa Beellamaa",
    photo: "Suuraa Wabii (Filannoo)",
    notes: "Ibsa Dabalataa (Filannoo)",
    type: "Gosa Meeshaa Filadhu",
    login: "Seensa Bulchaa",
    dashboard: "Daashboordii Bulchaa",
    orders: "Ajaja Meeshaalee",
    designs: "Dizaayinii Addaa",
    price: "Gatii",
    quantity: "Baay'ina",
    email: "Imeelii",
    password: "Jecha Iccitii",
    send: "Ergaa Ergi",
    message: "Ergaa Kee",
    empty: "Ammaaf gaaffiin hin jiru.",
    logout: "Ba'i",

    welcome: "Baga gara FurniHouse Itoophiyaa dhuftan",
    heroTitle: "Meeshaalee Manaa Bareedoo Jireenya Bareedaaf",
    heroDescription: "Meeshaalee mana keessan mijataa, ammayyaa fi hawwataa taasisan argadhaa.",
    collections: "Kuusaalee Keenya",
    collectionsDescription: "Kutaa mana keessaniif meeshaalee mijatoo ta'an filadhaa.",
    whyUs: "Maaliif FurniHouse Filattu?",
    quality: "Hojii Qulqullina Qabu",
    qualityDescription: "Meeshaalee bal'inaan xiyyeeffannoo kennuun hojjetaman.",
    modern: "Dizaayinii Ammayyaa",
    modernDescription: "Dizaayinoota bareedoo mana keessan waliin wal siman.",
    service: "Tajaajila Maamilaa",
    serviceDescription: "Meeshaa mana keessaniif mijataa ta'e akka filattan isin gargaarra.",
    learnMore: "Dabalataan Baradhaa",
    viewAll: "Hunda Ilaalaa",
    viewDetails: "Odeeffannoo Ilaali",
    allProducts: "Meeshaalee Hunda",
    sofas: "Sofaawwan",
    chairs: "Barcuma fi Minjaala",
    beds: "Sireewwan",
    doors: "Balbalawwan",
    available: "Ni argama",
    unavailable: "Hin argamu",
    inStock: "Kuusaa keessa jira",
    outOfStock: "Kuusaa keessa hin jiru",
    productDetails: "Odeeffannoo Meeshaa",
    description: "Ibsa",
    category: "Ramaddii",
    total: "Waliigala",
    subtotal: "Waliigala Xiqqaa",
    cart: "Korojoo Bittaa",
    emptyCart: "Korjoon bittaa kee duwwaadha.",
    continueShopping: "Bittaa Itti Fufi",
    remove: "Haqi",
    update: "Haaromsi",
    checkout: "Gara Kaffaltiitti Itti Fufi",
    customerInfo: "Odeeffannoo Maamilaa",
    deliveryAddress: "Teessoo Geessuu",
    address: "Teessoo Kee",
    city: "Magaalaa",
    orderNow: "Ajaja Galchi",
    orderSuccess: "Ajajni kee milkaa'inaan galmaa'eera!",
    orderHistory: "Seenaa Ajajaa",
    noOrders: "Ammaaf ajajni hin jiru.",
    contactTitle: "Nu Qunnamaa",
    contactDescription: "Gaaffii qabduu? Isin dhaggeeffachuuf qophiidha.",
    subject: "Mata Duree",
    sending: "Ergaa jira...",
    messageSuccess: "Ergaan kee milkaa'inaan ergameera!",
    required: "Dirree kana guutuun barbaachisaadha.",
    invalidEmail: "Imeelii sirrii galchi.",
    chooseLanguage: "Afaan Filadhu",
    customTitle: "Meeshaa Manaa Akka Fedhii Keetti Dizaayinii Godhi",
    customDescription: "Waan yaadde nutti himi; dizaayinii kee akka milkaa'u si gargaarra.",
    step: "Sadarkaa",
    review: "Gaaffii Kee Ilaali",
    upload: "Suuraa Olkaa'i",
    selectType: "Gosa Meeshaa Filadhu",
    dimensions: "Safara Meeshaa",
    finish: "Bal'ina Xumuraa",
    colorPlaceholder: "Halluu barbaadde galchi",
    adminWelcome: "Baga Deebitee Dhuftan",
    adminSubtitle: "Ajajoota fi gaaffii dizaayinii addaa bulchi.",
    pending: "Eeggachaa jira",
    approved: "Ragaa'eera",
    completed: "Xumurameera",
    rejected: "Fudhatama dhabeera",
    all: "Hunda",
    noDesigns: "Ammaaf gaaffiin dizaayinii addaa hin jiru.",
    noCustomerOrders: "Ammaaf ajajni meeshaa manaa hin jiru.",
    customer: "Maamilaa",
    date: "Guyyaa",
    status: "Haala",
    actions: "Gochaalee",
    confirm: "Mirkaneessi",
    delete: "Haqi",
    search: "Meeshaalee barbaadi...",
    filter: "Ramaddii irratti filadhu",
    sort: "Akkuma kanaan tartiibessi",
    newest: "Haaraa",
    lowestPrice: "Gatii Gad-aanaa",
    highestPrice: "Gatii Ol-aanaa",
    footerText: "Meeshaalee bareedoo. Jireenya bareedaa.",
    rights: "Mirgi hundi eegameera.",
    about: "Waa'ee Keenya",
    homeFurniture: "Meeshaalee Manaa Mana Hundaaf",
  },
};

export function AppProvider({ children }) {
  const [language, setLanguageState] = useState("en");
  const [orders, setOrders] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [notice, setNotice] = useState(null);
  const [ready, setReady] = useState(false);

  // Load saved information
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("fh-language");

      if (["en", "am", "om"].includes(savedLanguage)) {
        setLanguageState(savedLanguage);
      }

      setOrders(
        JSON.parse(localStorage.getItem("fh-orders") || "[]")
      );

      setDesigns(
        JSON.parse(localStorage.getItem("fh-designs") || "[]")
      );
    } catch (error) {
      console.error("Could not load saved data:", error);
    } finally {
      setReady(true);
    }
  }, []);

  // Save information
  useEffect(() => {
    if (!ready) return;

    localStorage.setItem("fh-language", language);
    localStorage.setItem("fh-orders", JSON.stringify(orders));
    localStorage.setItem("fh-designs", JSON.stringify(designs));
  }, [language, orders, designs, ready]);

  // Change language
  const setLanguage = (newLanguage) => {
    if (["en", "am", "om"].includes(newLanguage)) {
      setLanguageState(newLanguage);
    }
  };

  // Get current language dictionary
  const currentTranslations = translations[language] || translations.en;

  // Missing keys automatically use English
  const t = new Proxy(currentTranslations, {
    get(target, key) {
      return target[key] ?? translations.en[key] ?? String(key);
    },
  });

  // Show translated notifications
  const notify = (key) => {
    const message = t[key] || key;
    setNotice(message);
  };

  // Add furniture order
  
const addOrder = async (order) => {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to submit order.");
  }

  const savedOrder = {
    ...data.order,
    id: data.order._id,
  };

  setOrders((old) => [savedOrder, ...old]);

  notify("orderReceived");

  return savedOrder;
};


  // Add custom design

const addDesign = async (design) => {
  const response = await fetch("/api/designs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(design),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to submit design.");
  }

  const savedDesign = {
    ...data.design,
    id: data.design._id,
  };

  setDesigns((old) => [savedDesign, ...old]);

  notify("designReceived");

  return savedDesign;
};


  // Format money according to selected language
  const formatPrice = (price) => {
    const locale = {
      en: "en-ET",
      am: "am-ET",
      om: "om-ET",
    }[language] || "en-ET";

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format dates according to selected language
  const formatDate = (date) => {
    const locale = {
      en: "en-ET",
      am: "am-ET",
      om: "om-ET",
    }[language] || "en-ET";

    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translations,
        orders,
        designs,
        addOrder,
        addDesign,
        notice,
        notify,
        setNotice,
        ready,
        formatPrice,
        formatDate,
      }}
    >
      {children}

      {notice && (
        <div className="notification" role="status">
          <span>{notice}</span>

          <button
            onClick={() => setNotice(null)}
            aria-label={t.close}
            type="button"
          >
            ×
          </button>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}
