
"use client";

import { useEffect, useState } from "react";
import { toEC, toGC, toGeez } from "kenat";
import { X, ArrowLeft, ArrowRight, Upload, Check } from "lucide-react";
import { getLocalizedCategories } from "@/data/products";
import { useApp } from "@/context/AppContext";

// -----------------------------------------
// 1. TRANSLATIONS
// -----------------------------------------

const translations = {
  en: {
    studio: "FURNIHOUSE CUSTOM STUDIO",
    title: "Custom Design",
    subtitle: "Let's create something made just for you.",
    step: "STEP",
    of: "OF 4",
    type: "What would you like us to make?",
    design: "Tell us about your preferred design",
    optional: "All these details are optional. Skip anything you don't know yet.",
    length: "Length (metres)",
    width: "Width (metres)",
    lengthPlaceholder: "e.g. 2.5",
    widthPlaceholder: "e.g. 1.8",
    color: "Preferred color",
    colorPlaceholder: "e.g. Dark brown, cream, white...",
    appointment: "Preferred appointment date",
    chooseDate: "Choose a date",
    photo: "Reference picture",
    choosePhoto: "Choose a reference picture",
    notes: "Additional details",
    notesPlaceholder: "Describe any other preferences...",
    review: "Review your design request",
    furniture: "Furniture",
    notSelected: "Not selected",
    notSpecified: "Not specified",
    noPicture: "No picture attached",
    none: "None",
    reach: "How can we reach you?",
    reachDescription: "Your name and phone number are required so our team can contact you.",
    name: "Your name",
    phone: "Phone number",
    back: "Back",
    next: "Next",
    submit: "Submit request",
    imageTooLarge: "Please choose an image smaller than 2 MB.",
    imageOnly: "Please choose an image file.",
    previousMonth: "Previous month",
    nextMonth: "Next month",
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },

  am: {
    studio: "የፈርኒሀውስ ልዩ ዲዛይን ስቱዲዮ",
    title: "ልዩ ዲዛይን",
    subtitle: "ለእርስዎ ብቻ የተዘጋጀ ነገር እንፍጠር።",
    step: "ደረጃ",
    of: "ከ 4",
    type: "ምን እንድንሰራልዎ ይፈልጋሉ?",
    design: "ስለሚፈልጉት ዲዛይን ይንገሩን",
    optional: "እነዚህ መረጃዎች አማራጭ ናቸው። የማያውቁትን መተው ይችላሉ።",
    length: "ርዝመት (ሜትር)",
    width: "ስፋት (ሜትር)",
    lengthPlaceholder: "ለምሳሌ 2.5",
    widthPlaceholder: "ለምሳሌ 1.8",
    color: "የሚመርጡት ቀለም",
    colorPlaceholder: "ለምሳሌ ጥቁር ቡናማ፣ ክሬም፣ ነጭ...",
    appointment: "የሚመርጡት የቀጠሮ ቀን",
    chooseDate: "ቀን ይምረጡ",
    photo: "የማጣቀሻ ምስል",
    choosePhoto: "የማጣቀሻ ምስል ይምረጡ",
    notes: "ተጨማሪ ዝርዝሮች",
    notesPlaceholder: "ሌሎች ምርጫዎችዎን ይግለጹ...",
    review: "የዲዛይን ጥያቄዎን ይመልከቱ",
    furniture: "የቤት እቃ",
    notSelected: "አልተመረጠም",
    notSpecified: "አልተገለጸም",
    noPicture: "ምስል አልተያያዘም",
    none: "የለም",
    reach: "እንዴት ልናገኝዎ እንችላለን?",
    reachDescription: "ቡድናችን እንዲያገኝዎ ስምዎና ስልክ ቁጥርዎ ያስፈልጋሉ።",
    name: "ሙሉ ስም",
    phone: "ስልክ ቁጥር",
    back: "ተመለስ",
    next: "ቀጣይ",
    submit: "ጥያቄውን ላክ",
    imageTooLarge: "ከ2 MB ያነሰ ምስል ይምረጡ።",
    imageOnly: "እባክዎ የምስል ፋይል ይምረጡ።",
    previousMonth: "ያለፈው ወር",
    nextMonth: "ቀጣይ ወር",
    weekdays: ["እሑድ", "ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ"],
  },

  om: {
    studio: "FURNIHOUSE DIZAAYINII ADDA",
    title: "Dizaayinii Addaa",
    subtitle: "Wanta isin qofaaf qophaa'e haa uumnu.",
    step: "SADARKAA",
    of: "4 KEESSAA",
    type: "Maal akka isiniif hojjen nu barbaaddu?",
    design: "Waa'ee dizaayinii barbaaddan nutti himaa",
    optional: "Odeeffannoowwan kun dirqama miti. Wanta hin beekne dhiisuu dandeessu.",
    length: "Dheerina (meetira)",
    width: "Bal'ina (meetira)",
    lengthPlaceholder: "Fakkeenyaaf 2.5",
    widthPlaceholder: "Fakkeenyaaf 1.8",
    color: "Halluu filattan",
    colorPlaceholder: "Fakkeenyaaf bunaa dukkanaa, adii...",
    appointment: "Guyyaa beellamaa filattan",
    chooseDate: "Guyyaa filadhaa",
    photo: "Suuraa fakkeenyaa",
    choosePhoto: "Suuraa fakkeenyaa filadhaa",
    notes: "Odeeffannoo dabalataa",
    notesPlaceholder: "Filannoo keessan biroo ibsaa...",
    review: "Gaaffii dizaayinii keessanii mirkaneessaa",
    furniture: "Meeshaa mana keessaa",
    notSelected: "Hin filatamne",
    notSpecified: "Hin ibsamne",
    noPicture: "Suuraan hin dabal amne",
    none: "Homaa hin jiru",
    reach: "Akkamitti isin qunnamuu dandeenya?",
    reachDescription: "Gareen keenya akka isin qunnamuuf maqaa fi lakkoofsi bilbilaa keessan barbaachisaadha.",
    name: "Maqaa keessan",
    phone: "Lakkoofsa bilbilaa",
    back: "Duubatti",
    next: "Itti aanee",
    submit: "Gaaffii ergaa",
    imageTooLarge: "Suuraa 2 MB gadi ta'e filadhaa.",
    imageOnly: "Maaloo faayila suuraa filadhaa.",
    previousMonth: "Ji'a darbe",
    nextMonth: "Ji'a itti aanu",
    weekdays: ["Dilbata", "Wiixata", "Kibxata", "Roobii", "Kamiisa", "Jimaata", "Sanbata"],
  },
};

// -----------------------------------------
// 2. ETHIOPIAN CALENDAR MONTH NAMES
// -----------------------------------------

const ethiopianMonths = {
  am: [
    "መስከረም",
    "ጥቅምት",
    "ኅዳር",
    "ታህሳስ",
    "ጥር",
    "የካቲት",
    "መጋቢት",
    "ሚያዝያ",
    "ግንቦት",
    "ሰኔ",
    "ሐምሌ",
    "ነሐሴ",
    "ጳጉሜ",
  ],

  om: [
    "Fulbaana",
    "Onkololeessa",
    "Sadaasa",
    "Muddee",
    "Amajjii",
    "Guraandhala",
    "Bitootessa",
    "Ebla",
    "Caamsaa",
    "Waxabajjii",
    "Adooleessa",
    "Hagayya",
    "Qaammee",
  ],
};

// -----------------------------------------
// 3. DATE HELPER FUNCTIONS
// -----------------------------------------

function getTodayGregorian() {
  const today = new Date();

  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
}



function getGregorianISO(year, month, day) {
  const date = toGC(year, month, day);

  return [
    date.year,
    String(date.month).padStart(2, "0"),
    String(date.day).padStart(2, "0"),
  ].join("-");
}



function getEthiopianMonthLength(year, month) {
  if (month < 13) {
    return 30;
  }

  // Ethiopian leap years have 6 days in Pagume.
  return year % 4 === 3 ? 6 : 5;
}

function displayEthiopianNumber(number, language) {
  return language === "am" ? toGeez(number) : String(number);
}

// -----------------------------------------
// 4. MAIN COMPONENT
// -----------------------------------------

export default function CustomDesignModal({ onClose }) {
  const { addDesign, language } = useApp();

  const text = translations[language] || translations.en;
  const categories = getLocalizedCategories(language);

  const [step, setStep] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
   const [ethiopianView, setEthiopianView] = useState(null);
const [todayISOValue, setTodayISOValue] = useState("");

  const [form, setForm] = useState({
    category: "",
    length: "",
    width: "",
    color: "",
    appointment: "",
    photo: null,
    notes: "",
    customerName: "",
    phone: "",
  });

  const [photoName, setPhotoName] = useState("");
  const [submitting, setSubmitting] = useState(false);
const [submitError, setSubmitError] = useState("");

  // Reset the calendar to today's Ethiopian month
  // whenever the selected language changes.
  
  useEffect(() => {
  const today = getTodayGregorian();

  const iso = [
    today.year,
    String(today.month).padStart(2, "0"),
    String(today.day).padStart(2, "0"),
  ].join("-");

  setTodayISOValue(iso);

  setEthiopianView(
    toEC(today.year, today.month, today.day)
  );

  setShowCalendar(false);
}, [language]);

  // -----------------------------------------
  // 5. FORM FUNCTIONS
  // -----------------------------------------

  function update(field, value) {
    setForm((old) => ({
      ...old,
      [field]: value,
    }));
  }

  function handlePhoto(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert(text.imageTooLarge);
      e.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert(text.imageOnly);
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      update("photo", reader.result);
      setPhotoName(file.name);
    };

    reader.readAsDataURL(file);
  }

  
async function submit(e) {
  e.preventDefault();

  if (submitting) return;

  setSubmitting(true);
  setSubmitError("");

  try {
    await addDesign({
      ...form,
      customerName: form.customerName.trim(),
      phone: form.phone.trim(),
      status: "Pending",
    });

    onClose();
  } catch (error) {
    setSubmitError(
      error.message || "Unable to submit your design request."
    );
  } finally {
    setSubmitting(false);
  }
}


  // -----------------------------------------
  // 6. ETHIOPIAN CALENDAR FUNCTIONS
  // -----------------------------------------

  function changeEthiopianMonth(direction) {
    setEthiopianView((current) => {
      let month = current.month + direction;
      let year = current.year;

      if (month > 13) {
        month = 1;
        year += 1;
      }

      if (month < 1) {
        month = 13;
        year -= 1;
      }

      return {
        year,
        month,
        day: 1,
      };
    });
  }

  function selectEthiopianDay(day) {
    const selectedISO = getGregorianISO(
      ethiopianView.year,
      ethiopianView.month,
      day
    );

    // Do not allow dates in the past.
    if (todayISOValue && selectedISO < todayISOValue) {
      return;
    }

    // Save the date internally in Gregorian format.
    update("appointment", selectedISO);

    setShowCalendar(false);
  }

  function getCalendarDays() {
    // Find the Gregorian date of the first day
    // of the currently displayed Ethiopian month.
    const firstDay = toGC(
      ethiopianView.year,
      ethiopianView.month,
      1
    );

    // Find which weekday the first day belongs to.
    const startingWeekday = new Date(
      firstDay.year,
      firstDay.month - 1,
      firstDay.day
    ).getDay();

    const daysInMonth = getEthiopianMonthLength(
      ethiopianView.year,
      ethiopianView.month
    );

    // Empty spaces before day 1 align the calendar.
    return [
      ...Array(startingWeekday).fill(null),
      ...Array.from(
        { length: daysInMonth },
        (_, index) => index + 1
      ),
    ];
  }

  function formatAppointmentDate(dateString) {
    if (!dateString) {
      return text.notSelected;
    }

    const [year, month, day] = dateString
      .split("-")
      .map(Number);

    if (language === "en") {
      return new Date(year, month - 1, day).toLocaleDateString(
        "en-GB",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );
    }

    const etDate = toEC(year, month, day);

    const monthName = ethiopianMonths[language][
      etDate.month - 1
    ];

    const displayDay = displayEthiopianNumber(
      etDate.day,
      language
    );

    const displayYear = displayEthiopianNumber(
      etDate.year,
      language
    );

    return `${monthName} ${displayDay}, ${displayYear}`;
  }

  // -----------------------------------------
  // 7. SELECTED CATEGORY
  // -----------------------------------------

  const selectedCategory = categories.find(
    (category) => category.id === form.category
  );

  // -----------------------------------------
  // 8. DISPLAY THE MODAL
  // -----------------------------------------

  return (
    <div
      className="modal-overlay wizard-overlay"
      onClick={onClose}
    >
      <form
        className="modal wizard-modal"
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label={text.back}
        >
          <X />
        </button>

        {/* HEADING */}

        <div className="wizard-heading">
          <p className="eyebrow">{text.studio}</p>
          <h2>{text.title}</h2>
          <p className="muted">{text.subtitle}</p>
        </div>

        {/* PROGRESS BAR */}

        <div className="progress-track">
          {[1, 2, 3, 4].map((number) => (
            <span
              key={number}
              className={
                step >= number ? "progress-active" : ""
              }
            />
          ))}
        </div>

        <div className="step-label">
          {text.step} {step} {text.of}
        </div>

        {/* STEP 1: SELECT FURNITURE */}

        {step === 1 && (
          <div className="wizard-content">
            <h3>{text.type}</h3>

            <div className="type-grid">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  className={
                    form.category === category.id
                      ? "type-option selected"
                      : "type-option"
                  }
                  onClick={() =>
                    update("category", category.id)
                  }
                >
                  <span>{category.icon}</span>

                  <strong>{category.name}</strong>

                  {form.category === category.id && (
                    <Check size={17} />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: DESIGN DETAILS */}

        {step === 2 && (
          <div className="wizard-content">
            <h3>{text.design}</h3>

            <p className="muted">{text.optional}</p>

            <div className="form-grid">
              <div>
                <label>{text.length}</label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder={text.lengthPlaceholder}
                  value={form.length}
                  onChange={(e) =>
                    update("length", e.target.value)
                  }
                />
              </div>

              <div>
                <label>{text.width}</label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder={text.widthPlaceholder}
                  value={form.width}
                  onChange={(e) =>
                    update("width", e.target.value)
                  }
                />
              </div>
            </div>

            <label>{text.color}</label>

            <input
              placeholder={text.colorPlaceholder}
              value={form.color}
              onChange={(e) =>
                update("color", e.target.value)
              }
            />

            {/* APPOINTMENT CALENDAR */}

            <label>{text.appointment}</label>

            {language === "en" ? (
              // ENGLISH: GREGORIAN CALENDAR
              <input
                type="date"
                min={todayISOValue}
                value={form.appointment}
                onChange={(e) =>
                  update("appointment", e.target.value)
                }
              />
            ) : (
              // AMHARIC AND AFAAN OROMOO: ETHIOPIAN CALENDAR
              <div className="ethiopian-calendar">
                <button
                  type="button"
                  className="ethiopian-date-trigger"
                  onClick={() =>
                    setShowCalendar((old) => !old)
                  }
                >
                  {form.appointment
                    ? formatAppointmentDate(form.appointment)
                    : text.chooseDate}
                </button>

                {showCalendar && ethiopianView && (
                  <div className="ethiopian-calendar-panel">
                    {/* MONTH AND YEAR HEADER */}

                    <div className="ethiopian-calendar-header">
                      <button
                        type="button"
                        onClick={() =>
                          changeEthiopianMonth(-1)
                        }
                        aria-label={text.previousMonth}
                      >
                        ‹
                      </button>

                      <strong>
                        {ethiopianMonths[language][
                          ethiopianView.month - 1
                        ]}{" "}

                        {displayEthiopianNumber(
                          ethiopianView.year,
                          language
                        )}
                      </strong>

                      <button
                        type="button"
                        onClick={() =>
                          changeEthiopianMonth(1)
                        }
                        aria-label={text.nextMonth}
                      >
                        ›
                      </button>
                    </div>

                    {/* WEEKDAY HEADINGS AND DAYS */}

                    <div className="ethiopian-calendar-grid">
                      {text.weekdays.map((weekday) => (
                        <span
                          key={weekday}
                          className="calendar-weekday"
                        >
                          {weekday}
                        </span>
                      ))}

                      {getCalendarDays().map((day, index) => {
                        if (day === null) {
                          return (
                            <span key={`empty-${index}`} />
                          );
                        }

                        const dateISO = getGregorianISO(
                          ethiopianView.year,
                          ethiopianView.month,
                          day
                        );

                        const isPast =
  todayISOValue && dateISO < todayISOValue;

                        const isSelected =
                          dateISO === form.appointment;

                        return (
                          <button
                            type="button"
                            key={day}
                            disabled={isPast}
                            className={
                              isSelected ? "selected-day" : ""
                            }
                            onClick={() =>
                              selectEthiopianDay(day)
                            }
                          >
                            {displayEthiopianNumber(
                              day,
                              language
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* REFERENCE PICTURE */}

            <label>{text.photo}</label>

            <label className="upload-box">
              <Upload />

              <span>
                {photoName || text.choosePhoto}
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                hidden
              />
            </label>

            {/* ADDITIONAL NOTES */}

            <label>{text.notes}</label>

            <textarea
              rows="3"
              value={form.notes}
              onChange={(e) =>
                update("notes", e.target.value)
              }
              placeholder={text.notesPlaceholder}
            />
          </div>
        )}

        {/* STEP 3: REVIEW */}

        {step === 3 && (
          <div className="wizard-content review-box">
            <h3>{text.review}</h3>

            <p>
              <strong>{text.furniture}:</strong>{" "}
              {selectedCategory?.name || text.notSelected}
            </p>

            <p>
              <strong>{text.length}:</strong>{" "}
              {form.length || text.notSpecified}
            </p>

            <p>
              <strong>{text.width}:</strong>{" "}
              {form.width || text.notSpecified}
            </p>

            <p>
              <strong>{text.color}:</strong>{" "}
              {form.color || text.notSpecified}
            </p>

            <p>
              <strong>{text.appointment}:</strong>{" "}
              {formatAppointmentDate(form.appointment)}
            </p>

            <p>
              <strong>{text.photo}:</strong>{" "}
              {photoName || text.noPicture}
            </p>

            <p>
              <strong>{text.notes}:</strong>{" "}
              {form.notes || text.none}
            </p>
          </div>
        )}

        {/* STEP 4: CUSTOMER DETAILS */}

        {step === 4 && (
          <div className="wizard-content">
            <h3>{text.reach}</h3>

            <p className="muted">
              {text.reachDescription}
            </p>

            <label>{text.name} *</label>

            <input
              required
              value={form.customerName}
              onChange={(e) =>
                update("customerName", e.target.value)
              }
              placeholder={text.name}
            />

            <label>{text.phone} *</label>

            <input
              required
              type="tel"
              pattern="[0-9+ ()-]{7,20}"
              value={form.phone}
              onChange={(e) =>
                update("phone", e.target.value)
              }
              placeholder="+251..."
            />
          </div>
        )}
      
      {submitError && (
  <p className="error-message" role="alert">
    {submitError}
  </p>
)}
        {/* BACK AND NEXT BUTTONS */}

        <div className="wizard-actions">
          {step > 1 ? (
            <button
              type="button"
              className="secondary-btn"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft size={16} />
              {text.back}
            </button>
          ) : (
            <span />
          )}

          {step < 4 ? (
            <button
              type="button"
              className="primary-btn"
              disabled={step === 1 && !form.category}
              onClick={() => setStep(step + 1)}
            >
              {text.next}
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
  type="submit"
  className="primary-btn"
  disabled={submitting}
>
  {submitting ? "Submitting..." : text.submit}
  <Check size={16} />
</button>
          )}
        </div>
      </form>
    </div>
  );
}
