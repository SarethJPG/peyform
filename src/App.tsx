import { useEffect, useMemo, useRef, useState } from "react";

type View =
  | "welcome"
  | "business"
  | "register"
  | "create"
  | "hub"
  | "scan"
  | "login"
  | "signup"
  | "bprofile"
  | "forms"
  | "order"
  | "client"
  | "profile"
  | "payform"
  | "payprocess"
  | "success";

type NavId = "home" | "create" | "pay" | "profile";

type IconName =
  | "arrow"
  | "bank"
  | "bell"
  | "briefcase"
  | "check"
  | "chevron"
  | "copy"
  | "database"
  | "eyeOff"
  | "form"
  | "home"
  | "lock"
  | "menu"
  | "phone"
  | "plus"
  | "trash"
  | "logout"
  | "mail"
  | "edit"
  | "send"
  | "template"
  | "qr"
  | "share"
  | "spark"
  | "user"
  | "wallet";

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    bank: (
      <>
        <path d="m3 10 9-6 9 6" />
        <path d="M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="3" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    copy: (
      <>
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </>
    ),
    eyeOff: (
      <>
        <path d="m3 3 18 18" />
        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 4.2A10.6 10.6 0 0 1 12 4c5 0 9 5 9 8a7.7 7.7 0 0 1-1.2 2.6M6.6 6.6C4.4 8 3 10.2 3 12c0 3 4 8 9 8a9.5 9.5 0 0 0 3.4-.6" />
      </>
    ),
    form: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="3" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="3" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    phone: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="3" />
        <path d="M10 5h4M11 18h2" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    logout: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="m16 17 5-5-5-5M21 12H9" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    trash: (
      <>
        <path d="M4 7h16M10 11v6M14 11v6" />
        <path d="M6 7l1 13h10l1-13M9 7V4h6v3" />
      </>
    ),
    edit: (
      <>
        <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
        <path d="m13.5 6.5 4 4" />
      </>
    ),
    send: (
      <>
        <path d="M21 3 10 14" />
        <path d="m21 3-7 18-4-7-7-4 18-7Z" />
      </>
    ),
    template: (
      <>
        <rect x="3" y="3" width="7" height="9" rx="2" />
        <rect x="14" y="3" width="7" height="5" rx="2" />
        <rect x="14" y="12" width="7" height="9" rx="2" />
        <rect x="3" y="16" width="7" height="5" rx="2" />
      </>
    ),
    qr: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 20h2M20 14h1" />
      </>
    ),
    share: (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z" />
        <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    wallet: (
      <>
        <path d="M4 6h14a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h12" />
        <path d="M16 12h6v4h-6a2 2 0 0 1 0-4Z" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Brand() {
  return (
    <div className="brand">
      <span>
        <Icon name="spark" size={20} />
      </span>
      <b style={{ opacity: 0.7 }}>PeyForm</b>
    </div>
  );
}

function Button({
  children,
  onClick,
  secondary,
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      className={`button ${secondary ? "secondary" : ""}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <label className={`input-group ${error ? "error" : ""}`}>
      <span>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
      />
      {error && (
        <small>
          <span>!</span>
          {error}
        </small>
      )}
    </label>
  );
}

function TopBar({
  title,
  back,
  role,
  onRole,
}: {
  title?: string;
  back?: () => void;
  role?: "Empresa" | "Cliente";
  onRole?: () => void;
}) {
  return (
    <header className="top-bar">
      {back ? (
        <button className="icon-button back" onClick={back} aria-label="Regresar">
          <Icon name="chevron" />
        </button>
      ) : (
        <Brand />
      )}
      {title && <h1>{title}</h1>}
      {role ? (
        <button className="role-chip" onClick={onRole}>
          {role}
        </button>
      ) : (
        <span className="top-spacer" />
      )}
    </header>
  );
}

function BottomNav({
  active,
  onNavigate,
  hidden = [],
  layout = {},
  showPay = false,
}: {
  showPay?: boolean;
  hidden?: NavId[];
  layout?: Partial<Record<NavId, "row" | "row-reverse">>;
  active: NavId;
  onNavigate: (item: NavId) => void;
}) {
  const items: { id: NavId; label: string; icon: IconName }[] = [
    { id: "home", label: "Inicio", icon: "home" },
    { id: "create", label: "Crear", icon: "plus" },
    { id: "pay", label: "Pagar", icon: "wallet" },
    { id: "profile", label: "Perfil", icon: "user" },
  ];
  const visible = items.filter(
    (item) => !hidden.includes(item.id) && (item.id !== "pay" || showPay),
  );
  return (
    <nav
      className="bottom-nav"
      aria-label="Navegación principal"
      style={{ gridTemplateColumns: `repeat(${visible.length}, 1fr)` }}
    >
      {visible.map((item) => (
        <button
          key={item.id}
          className={active === item.id ? "active" : ""}
          onClick={() => onNavigate(item.id)}
          style={layout[item.id] ? { flexDirection: layout[item.id], gap: 8 } : undefined}
        >
          <Icon name={item.icon} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function QrCode() {
  const cells = [
    0, 1, 2, 3, 4, 6, 8, 9, 10, 12, 14, 16, 17, 18, 20, 22, 24, 25, 26, 28, 30, 31, 32, 34, 36, 38,
    39, 40, 42, 44, 46, 47, 48,
  ];
  return (
    <div className="qr-code" aria-label="Código QR de pago">
      {Array.from({ length: 49 }).map((_, index) => (
        <i key={index} className={cells.includes(index) ? "on" : ""} />
      ))}
    </div>
  );
}

function Welcome({ onStart }: { onStart: (role: "business" | "client") => void }) {
  return (
    <section className="screen welcome-screen">
      <div className="welcome-top">
        <Brand />
        <span className="country">Hecho en México</span>
      </div>
      <div className="hero-visual" aria-label="Pago y datos conectados de forma segura">
        <div className="hero-phone">
          <span className="hero-check">
            <Icon name="check" size={30} />
          </span>
          <small>Pago confirmado</small>
          <strong>$800.00</strong>
          <i />
          <p>Sofía García · MC-024</p>
        </div>
        <span className="float-card data">
          <Icon name="form" />
          Datos listos
        </span>
        <span className="float-card fee">
          <b>0%</b>
          comisión
        </span>
      </div>
      <div className="welcome-copy">
        <span className="eyebrow">PAGOS CODI + DATOS</span>
        <h1>
          Cobra con contexto.
          <br />
          <em>Sin comisiones.</em>
        </h1>
        <p>Pagos instantáneos y formularios inteligentes para negocios mexicanos.</p>
      </div>
      <div className="role-actions">
        <Button onClick={() => onStart("business")}>
          <Icon name="briefcase" />
          Soy una empresa
        </Button>
        <Button secondary onClick={() => onStart("client")}>
          <Icon name="user" />
          Soy cliente
        </Button>
      </div>
      <p className="security-note">
        <Icon name="lock" size={16} />
        Tus datos siempre viajan cifrados
      </p>
    </section>
  );
}

function BusinessHome({
  registered,
  payments,
  alert,
  onDismissAlert,
  alias,
  onRegister,
  onCreate,
  onProfile,
}: {
  registered: boolean;
  payments: Payment[];
  alert: Payment | null;
  onDismissAlert: () => void;
  alias: string;
  onRegister: () => void;
  onCreate: () => void;
  onProfile: () => void;
}) {
  return (
    <section className="screen with-nav">
      <TopBar />
      <div className="page-content">
        <div className="greeting">
          <div>
            <p>Buenos días</p>
            <h2>{registered ? alias : "Tu negocio"}</h2>
          </div>
          <button className="icon-button" aria-label="Notificaciones">
            <Icon name="bell" />
            {alert && <i />}
          </button>
        </div>

        <p className="sync-chip">
          <i />
          Consultando pagos cada 3 segundos
        </p>
        {alert && (
          <div className="payment-alert" role="alert">
            <div className="payment-alert-head">
              <span>
                <Icon name="check" size={22} />
              </span>
              <div>
                <b>Pago recibido y conciliado</b>
                <small>Webhook de Pey.mx confirmado · {alert.id}</small>
              </div>
            </div>
            <dl>
              <div>
                <dt>Nombre</dt>
                <dd>{alert.name}</dd>
              </div>
              <div>
                <dt>Expediente</dt>
                <dd>{alert.expediente}</dd>
              </div>
              <div>
                <dt>Servicio</dt>
                <dd>{alert.service}</dd>
              </div>
              <div>
                <dt>Monto</dt>
                <dd>{money(alert.amount)}</dd>
              </div>
              {alert.fields
                .filter((field) => field.value !== alert.name && field.value !== alert.expediente)
                .map((field) => (
                  <div key={field.label}>
                    <dt>{field.label}</dt>
                    <dd>{field.value}</dd>
                  </div>
                ))}
            </dl>
            <div className="payment-alert-foot">
              <span>
                <Icon name="check" size={15} />
                Pagado
              </span>
              <span>
                <Icon name="database" size={15} />
                Sin duplicados
              </span>
              <button onClick={onDismissAlert}>Entendido</button>
            </div>
          </div>
        )}
        {!registered ? (
          <div className="setup-card">
            <span>
              <Icon name="briefcase" size={28} />
            </span>
            <small>PRIMER PASO</small>
            <h3>Configura tu negocio</h3>
            <p>Registra tus datos fiscales y bancarios para comenzar a cobrar.</p>
            <Button onClick={onRegister}>
              Registrar negocio
              <Icon name="arrow" />
            </Button>
          </div>
        ) : (
          <>
            <div className="balance-card">
              <div>
                <small>COBRADO ESTE MES</small>
                <strong>{money(800 + payments.reduce((sum, item) => sum + item.amount, 0))}</strong>
                <span>MXN</span>
              </div>
              <span className="zero-fee">
                <Icon name="check" size={16} />
                $0 en comisiones
              </span>
            </div>
            <Button onClick={onCreate}>
              <Icon name="plus" />
              Crear nuevo cobro
            </Button>
            <div className="section-heading">
              <h3>Actividad reciente</h3>
              <button>Ver todo</button>
            </div>
            <div className="activity-list">
              {[...payments].reverse().map((item) => (
                <div className="activity new" key={item.id}>
                  <span className="avatar">{initials(item.name)}</span>
                  <div>
                    <b>{item.name}</b>
                    <small>
                      {item.service} · {item.expediente}
                    </small>
                  </div>
                  <div>
                    <strong>+{money(item.amount)}</strong>
                    <span>
                      <Icon name="check" size={14} />
                      Pagado
                    </span>
                  </div>
                </div>
              ))}
              <div className="activity">
                <span className="avatar">LM</span>
                <div>
                  <b>Luis Martínez</b>
                  <small>Consulta · MC-023</small>
                </div>
                <div>
                  <strong>+$800</strong>
                  <span>
                    <Icon name="check" size={14} />
                    Pagado
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <BottomNav
        active="home"
        onNavigate={(item) => {
          if (item === "create") onCreate();
          if (item === "profile") registered ? onProfile() : onRegister();
        }}
      />
    </section>
  );
}

function RegisterBusiness({ onDone, onBack }: { onDone: () => void; onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [rfc, setRfc] = useState("");
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [account, setAccount] = useState("");
  const valid =
    step === 1
      ? rfc.length >= 10 && name.length > 3
      : step === 2
        ? alias.length > 2
        : account.length >= 4;
  const next = () => (step < 3 ? setStep(step + 1) : onDone());

  return (
    <section className="screen form-screen">
      <TopBar title="Registrar negocio" back={step === 1 ? onBack : () => setStep(step - 1)} />
      <div className="page-content">
        <div className="progress-head">
          <div className="progress-bar">
            <i style={{ width: `${(step / 3) * 100}%` }} />
          </div>
          <span>Paso {step} de 3</span>
        </div>
        {step === 1 && (
          <div className="form-block">
            <span className="form-icon">
              <Icon name="briefcase" />
            </span>
            <h2>Datos fiscales</h2>
            <p>Usaremos esta información para identificar tu negocio.</p>
            <Input label="RFC" value={rfc} onChange={setRfc} placeholder="MELR920314AB1" />
            <label className="input-group">
              <span>Figura jurídica</span>
              <select defaultValue="Persona física">
                <option>Persona física</option>
                <option>Persona moral</option>
              </select>
            </label>
            <Input
              label="Razón social"
              value={name}
              onChange={setName}
              placeholder="Nombre fiscal"
            />
          </div>
        )}
        {step === 2 && (
          <div className="form-block">
            <span className="form-icon">
              <Icon name="spark" />
            </span>
            <h2>Tu identidad</h2>
            <p>Este nombre será visible para tus clientes.</p>
            <Input
              label="Alias del negocio"
              value={alias}
              onChange={setAlias}
              placeholder="Mente Clara"
            />
            <div className="preview-name">
              <small>TUS CLIENTES VERÁN</small>
              <span className="brand-avatar">{alias.slice(0, 2).toUpperCase() || "MC"}</span>
              <b>{alias || "Nombre del negocio"}</b>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="form-block">
            <span className="form-icon">
              <Icon name="bank" />
            </span>
            <h2>Cuenta de cobro</h2>
            <p>CoDi depositará directamente en esta cuenta. Sin intermediarios.</p>
            <Input
              label="CLABE o número de cuenta"
              value={account}
              onChange={setAccount}
              placeholder="18 dígitos"
              type="tel"
            />
            <div className="info-card">
              <Icon name="lock" />
              <p>
                <b>Conexión segura con Pey.mx</b>
                Validaremos tu cuenta sin almacenar credenciales bancarias.
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="sticky-action">
        <Button onClick={next} disabled={!valid}>
          {step === 3 ? "Finalizar registro" : "Continuar"}
          <Icon name={step === 3 ? "check" : "arrow"} />
        </Button>
      </div>
    </section>
  );
}

// ✅ CORRECCIÓN #1: la firma de `onCreated` ahora incluye `qrUrl`.
function CreateCharge({
  onBack,
  onCreated,
}: {
  onBack: () => void;
  onCreated: (amount: string, concept: string, qrUrl: string | null) => void;
}) {
  const [prompt, setPrompt] = useState(
    "Cobro consulta de $800 y necesito nombre, teléfono y número de expediente",
  );
  const [generated, setGenerated] = useState(false);
  const [amount, setAmount] = useState("800");
  const [concept, setConcept] = useState("Consulta psicológica");
  const [fields, setFields] = useState(["Nombre completo", "Teléfono", "Número de expediente"]);
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  async function generate() {
    const money = prompt.match(/\$?\s?(\d[\d,.]*)/);
    if (money) setAmount(money[1].replace(",", ""));

    try {
      const response = await fetch("/api/codi/qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer sk_live_QvcVNZTTsdFmyAWN3MIOjDkzOjxR9_0t",
        },
        body: JSON.stringify({
          amount: 0.01,
          concept: "Demo Hackathon", // CoDi requiere un concepto corto
          numRef: "12345",         // CoDi requiere una referencia numérica
          expiration: 3600         // Tiempo de expiración en segundos
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Orden creada en pey.mx:", data);

        const paymentLink = data.url || data.payment_link || "https://pey.mx";
        const realQrImage = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
          paymentLink,
        )}`;
        setQrUrl(realQrImage);
      }
    } catch (error) {
      console.error("Error al conectar con pey.mx:", error);
    }

    setGenerated(true);
  }
  return (
    <section className="screen form-screen">
      <TopBar title="Nuevo cobro" back={onBack} />
      <div className="page-content">
        {!generated ? (
          <div className="ai-create">
            <span className="form-icon">
              <Icon name="spark" />
            </span>
            <h2>¿Qué quieres cobrar?</h2>
            <p>Descríbelo con tus palabras. La IA preparará el formulario.</p>
            <label className="prompt-input">
              <span>Descripción del cobro</span>
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={6}
              />
              <small>{prompt.length}/240</small>
            </label>
            <div className="example-chip">
              <Icon name="spark" size={16} />
              Incluye monto y datos que necesitas
            </div>
            <Button onClick={generate} disabled={prompt.length < 12}>
              Generar con IA
              <Icon name="spark" />
            </Button>
          </div>
        ) : (
          <div className="generated">
            <span className="ai-badge">
              <Icon name="spark" size={16} />
              Generado con IA
            </span>
            <h2>Revisa tu cobro</h2>
            <p>Puedes ajustar cualquier detalle antes de publicarlo.</p>
            <div
              className="amount-input"
              role="group"
              aria-label={`Monto del cobro: ${amount} pesos mexicanos`}
            >
              <span>$</span>
              <output>{Number(amount || 0).toLocaleString("es-MX")}</output>
              <small>MXN</small>
            </div>
            <Input label="Concepto" value={concept} onChange={setConcept} />
            <div className="field-list">
              <div className="section-heading">
                <h3>Datos solicitados</h3>
                <button onClick={() => setFields([...fields, "Correo electrónico"])}>
                  <Icon name="plus" size={17} />
                  Agregar
                </button>
              </div>
              {fields.map((field, index) => (
                <div className="requested-field" key={`${field}-${index}`}>
                  <Icon name="form" size={19} />
                  <span>{field}</span>
                  {index > 2 && (
                    <button
                      aria-label={`Eliminar ${field}`}
                      onClick={() =>
                        setFields(fields.filter((_, itemIndex) => itemIndex !== index))
                      }
                    >
                      ×
                    </button>
                  )}
                  {index <= 2 && <small>Obligatorio</small>}
                </div>
              ))}
            </div>
            <div className="privacy-mini">
              <Icon name="lock" size={20} />
              Solo recibirás estos {fields.length} datos.
            </div>
            <Button
              onClick={() => onCreated(amount, concept, qrUrl)}
              disabled={!amount || !concept}
            >
              Crear orden de pago
              <Icon name="arrow" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function OrderReady({
  amount,
  concept,
  qrUrl,
  onBack,
  onClient,
}: {
  amount: string;
  concept: string;
  qrUrl: string | null;
  onBack: () => void;
  onClient: () => void;
}) {
  const [copied, setCopied] = useState(false);
  async function copyLink() {
    try {
      await navigator.clipboard.writeText("https://app.mx/pago/PX-3812");
    } catch {
      // Clipboard can be unavailable in embedded previews.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }
  async function share() {
    if (navigator.share) {
      await navigator.share({ title: concept, text: `Paga $${amount} con CoDi` });
    } else {
      copyLink();
    }
  }

  return (
    <section className="screen form-screen">
      <TopBar title="Orden creada" back={onBack} />
      <div className="page-content order-ready">
        <span className="success-icon">
          <Icon name="check" size={32} />
        </span>
        <h2>Lista para cobrar</h2>
        <p>Comparte el QR o el enlace con tu cliente.</p>
        <div className="qr-card">
          <span className="pey-badge">Enlace de pago · Pey.mx</span>
          {qrUrl ? (
            <img
              src={qrUrl}
              alt="Código QR real de Pey.mx"
              style={{
                width: 180,
                height: 180,
                borderRadius: 18,
                border: "1px solid #e4e7ec",
                padding: 13,
              }}
            />
          ) : (
            <QrCode />
          )}
          <strong>${Number(amount || 0).toLocaleString("es-MX")}.00</strong>
          <p>{concept}</p>
          <small>Orden PX-3812</small>
        </div>
        <span className="commission">
          <Icon name="check" size={17} />
          0% de comisión
        </span>
        <div className="split-actions">
          <Button secondary onClick={copyLink}>
            <Icon name={copied ? "check" : "copy"} />
            {copied ? "Copiado" : "Copiar"}
          </Button>
          <Button onClick={share}>
            <Icon name="share" />
            Compartir
          </Button>
        </div>
        <button className="demo-link" onClick={onClient}>
          Simular experiencia del cliente
          <Icon name="arrow" size={18} />
        </button>
      </div>
    </section>
  );
}

function ClientHome({
  hasProfile,
  onProfile,
  onPay,
  onScan,
  onSwitch,
}: {
  hasProfile: boolean;
  onProfile: () => void;
  onScan: () => void;
  onPay: () => void;
  onSwitch: () => void;
}) {
  return (
    <section className="screen with-nav">
      <TopBar role="Cliente" onRole={onSwitch} />
      <div className="page-content">
        <div className="greeting">
          <div>
            <p>Hola{hasProfile ? ", Sofía" : ""}</p>
            <h2>¿Qué quieres hacer?</h2>
          </div>
          <span className="profile-avatar">
            <Icon name="user" />
          </span>
        </div>
        <button className="pending-charge" onClick={hasProfile ? onPay : onProfile}>
          <div className="merchant-logo">MC</div>
          <div>
            <small>SOLICITUD DE COBRO</small>
            <b>Mente Clara</b>
            <span>Consulta psicológica</span>
          </div>
          <div>
            <strong>$800</strong>
            <Icon name="chevron" />
          </div>
        </button>
        {!hasProfile ? (
          <div className="profile-invite">
            <span>
              <Icon name="user" />
            </span>
            <div>
              <h3>Completa tus datos</h3>
              <p>Llena tus datos una vez y ahorra tiempo en cada pago.</p>
            </div>
            <Button onClick={onProfile}>Crear perfil</Button>
          </div>
        ) : (
          <div className="privacy-status">
            <span>
              <Icon name="lock" />
            </span>
            <div>
              <b>Tu perfil está protegido</b>
              <p>Nadie ve tus datos sin tu autorización.</p>
            </div>
            <Icon name="check" />
          </div>
        )}
        <div className="how-card">
          <h3>Privacidad en cada pago</h3>
          <div>
            <span>
              <Icon name="form" />
            </span>
            <p>
              <b>El negocio solicita</b>Solo los datos que necesita.
            </p>
          </div>
          <div>
            <span>
              <Icon name="lock" />
            </span>
            <p>
              <b>Tú autorizas</b>Siempre sabes qué compartirás.
            </p>
          </div>
        </div>
      </div>
      <BottomNav
        active="home"
        hidden={["create"]}
        showPay
        layout={{ home: "row-reverse", profile: "row" }}
        onNavigate={(item) => {
          if (item === "profile") onProfile();
          if (item === "pay") onScan();
        }}
      />
    </section>
  );
}

function ProfileForm({ onDone, onBack }: { onDone: () => void; onBack: () => void }) {
  const [name, setName] = useState("Sofía");
  const [lastName, setLastName] = useState("García Luna");
  const [phone, setPhone] = useState("5512345678");
  const [email, setEmail] = useState("sofia@email.com");
  const [birth, setBirth] = useState("1991-09-18");
  const [accepted, setAccepted] = useState(false);
  const valid = name && lastName && phone.length === 10 && email.includes("@") && birth && accepted;

  return (
    <section className="screen form-screen">
      <TopBar title="Perfil maestro" back={onBack} />
      <div className="page-content">
        <div className="form-block compact">
          <span className="form-icon">
            <Icon name="user" />
          </span>
          <h2>Llénalo una sola vez</h2>
          <p>Después, solo elegirás qué datos compartir.</p>
          <Input label="Nombre" value={name} onChange={setName} />
          <Input label="Apellidos" value={lastName} onChange={setLastName} />
          <Input
            label="Teléfono"
            value={phone}
            onChange={(value) => setPhone(value.replace(/\D/g, "").slice(0, 10))}
            type="tel"
            error={
              phone.length > 0 && phone.length !== 10 ? "Ingresa exactamente 10 dígitos" : undefined
            }
          />
          <Input label="Fecha de nacimiento" value={birth} onChange={setBirth} type="date" />
          <Input label="Correo" value={email} onChange={setEmail} type="email" />
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
            />
            <span>
              <Icon name="check" size={16} />
            </span>
            <p>
              Acepto el <button type="button">aviso de privacidad</button>
            </p>
          </label>
        </div>
      </div>
      <div className="sticky-action">
        <Button onClick={onDone} disabled={!valid}>
          Guardar perfil
          <Icon name="check" />
        </Button>
      </div>
    </section>
  );
}

function Success({
  payment,
  merchant,
  onHome,
  onBusiness,
}: {
  payment: Payment;
  merchant: string;
  onHome: () => void;
  onBusiness: () => void;
}) {
  return (
    <section className="screen success-screen">
      <div className="success-illustration">
        <span>
          <Icon name="check" size={55} />
        </span>
        <i className="dot one" />
        <i className="dot two" />
        <i className="dot three" />
      </div>
      <span className="success-label">PAGO CONFIRMADO</span>
      <h1>{money(payment.amount)}</h1>
      <p>Tu pago y tus datos llegaron juntos a {merchant}.</p>
      <div className="receipt">
        <div>
          <span>Servicio</span>
          <b>{payment.service}</b>
        </div>
        <div>
          <span>Expediente</span>
          <b>{payment.expediente}</b>
        </div>
        <div>
          <span>Folio CoDi</span>
          <b>{payment.id}</b>
        </div>
        <div>
          <span>Estado</span>
          <b className="paid-status">
            <Icon name="check" size={15} />
            Pagado
          </b>
        </div>
      </div>
      <div className="reconciled">
        <Icon name="database" />
        <p>
          <b>Conciliación automática</b>
          Sin capturas, referencias ni duplicados.
        </p>
      </div>
      <div className="success-actions">
        <Button onClick={onHome}>Volver al inicio</Button>
        <button onClick={onBusiness}>
          Ver resultado en la empresa
          <Icon name="arrow" size={18} />
        </button>
      </div>
    </section>
  );
}

type FieldType = "text" | "tel" | "email" | "number" | "date";
interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
}
interface SavedForm {
  id: string;
  name: string;
  fields: FormField[];
}

const fieldTypes: { value: FieldType; label: string }[] = [
  { value: "text", label: "Texto" },
  { value: "tel", label: "Teléfono" },
  { value: "email", label: "Correo" },
  { value: "number", label: "Número" },
  { value: "date", label: "Fecha" },
];

const uid = () => Math.random().toString(36).slice(2, 9);
const makeField = (label: string, type: FieldType = "text", required = true): FormField => ({
  id: uid(),
  label,
  type,
  required,
});

function guessType(label: string): FieldType {
  const text = label.toLowerCase();
  if (/tel[eé]fono|celular|whatsapp/.test(text)) return "tel";
  if (/correo|email|e-mail/.test(text)) return "email";
  if (/fecha|nacimiento|llegada|salida|cumplea/.test(text)) return "date";
  if (/edad|monto|cantidad|n[uú]mero|habitaciones|hu[eé]spedes|personas/.test(text))
    return "number";
  return "text";
}

function inferFields(input: string): FormField[] {
  return input
    .replace(/^.*?(necesito|quiero|solicitar|pedir|campos?|datos?)(\s+de)?(\s*:)?\s*/i, "")
    .split(/,|;|\n|\sy\s|\se\s/i)
    .map((part) =>
      part
        .replace(/^(el|la|los|las|un|una|mi|su|tu)\s+/i, "")
        .replace(/[.:]+$/, "")
        .trim(),
    )
    .filter((part) => part.length > 1 && part.length < 40)
    .map((part) => makeField(part.charAt(0).toUpperCase() + part.slice(1), guessType(part)));
}

const formTemplates: {
  id: string;
  name: string;
  description: string;
  fields: [string, FieldType][];
}[] = [
  {
    id: "consultorio",
    name: "Consultorio médico",
    description: "Datos básicos del paciente y motivo de consulta.",
    fields: [
      ["Nombre completo", "text"],
      ["Teléfono", "tel"],
      ["Número de expediente", "text"],
      ["Motivo de consulta", "text"],
    ],
  },
  {
    id: "gimnasio",
    name: "Gimnasio · Day Pass",
    description: "Acceso por día con contacto de emergencia.",
    fields: [
      ["Nombre completo", "text"],
      ["Teléfono", "tel"],
      ["Correo", "email"],
      ["Contacto de emergencia", "tel"],
    ],
  },
  {
    id: "hotel",
    name: "Reservación de hotel",
    description: "Huésped, fechas y número de personas.",
    fields: [
      ["Nombre del huésped", "text"],
      ["Correo", "email"],
      ["Fecha de llegada", "date"],
      ["Fecha de salida", "date"],
      ["Número de huéspedes", "number"],
    ],
  },
  {
    id: "clases",
    name: "Clases y talleres",
    description: "Inscripción de alumnos y su nivel.",
    fields: [
      ["Nombre del alumno", "text"],
      ["Teléfono", "tel"],
      ["Edad", "number"],
      ["Nivel o experiencia", "text"],
    ],
  },
  {
    id: "deportes",
    name: "Estudio de deportes",
    description: "Reserva de cancha o clase con horario.",
    fields: [
      ["Nombre completo", "text"],
      ["Teléfono", "tel"],
      ["Fecha de reserva", "date"],
      ["Número de personas", "number"],
    ],
  },
];

function CreateHub({
  forms,
  onBack,
  onCharge,
  onNewForm,
  onEditForm,
  onProfile,
}: {
  forms: SavedForm[];
  onProfile: () => void;
  onBack: () => void;
  onCharge: () => void;
  onNewForm: () => void;
  onEditForm: (id: string) => void;
}) {
  return (
    <section className="screen with-nav">
      <TopBar title="Crear" />
      <div className="page-content">
        <p className="hub-intro">¿Qué quieres crear hoy?</p>
        <button className="hub-card" onClick={onCharge}>
          <span>
            <Icon name="wallet" size={26} />
          </span>
          <div>
            <b>Nuevo cobro</b>
            <small>Orden de pago con QR y datos del cliente.</small>
          </div>
          <Icon name="chevron" />
        </button>
        <button className="hub-card" onClick={onNewForm}>
          <span>
            <Icon name="form" size={26} />
          </span>
          <div>
            <b>Formulario</b>
            <small>Constructor, IA y plantillas.</small>
          </div>
          <Icon name="chevron" />
        </button>
        <div className="section-heading">
          <h3>Mis formularios</h3>
          <span className="count-chip">{forms.length}</span>
        </div>
        {forms.length === 0 ? (
          <div className="empty-state">
            <Icon name="form" size={26} />
            <p>Aún no tienes formularios guardados.</p>
          </div>
        ) : (
          <div className="activity-list">
            {forms.map((form) => (
              <button className="saved-form" key={form.id} onClick={() => onEditForm(form.id)}>
                <span>
                  <Icon name="form" />
                </span>
                <div>
                  <b>{form.name}</b>
                  <small>{form.fields.length} campos</small>
                </div>
                <Icon name="edit" size={20} />
              </button>
            ))}
          </div>
        )}
      </div>
      <BottomNav
        active="create"
        onNavigate={(item) => {
          if (item === "home") onBack();
          if (item === "profile") onProfile();
        }}
      />
    </section>
  );
}

function FormBuilder({
  initial,
  onBack,
  onSave,
  onDelete,
}: {
  initial?: SavedForm;
  onBack: () => void;
  onSave: (form: SavedForm) => void;
  onDelete: (id: string) => void;
}) {
  const [tab, setTab] = useState<"builder" | "templates">("builder");
  const [formId] = useState(initial?.id ?? uid());
  const [name, setName] = useState(initial?.name ?? "Formulario sin título");
  const [fields, setFields] = useState<FormField[]>(initial?.fields ?? []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [thinking, setThinking] = useState(false);
  const [saved, setSaved] = useState(false);
  const [messages, setMessages] = useState<{ from: "ai" | "user"; text: string }[]>([
    {
      from: "ai",
      text: "Describe brevemente los campos que necesitas. Ejemplo: nombre, teléfono y número de expediente.",
    },
  ]);

  function send() {
    const text = prompt.trim();
    if (!text || thinking) return;
    setPrompt("");
    setThinking(true);
    setMessages((current) => [...current, { from: "user", text }]);
    window.setTimeout(() => {
      const known = new Set(fields.map((field) => field.label.toLowerCase()));
      const created = inferFields(text).filter((field) => !known.has(field.label.toLowerCase()));
      if (created.length) setFields((current) => [...current, ...created]);
      setMessages((current) => [
        ...current,
        {
          from: "ai",
          text: created.length
            ? `Agregué ${created.length} ${created.length === 1 ? "campo" : "campos"}: ${created
                .map((field) => field.label)
                .join(", ")}. Puedes editarlos o borrarlos abajo.`
            : "No encontré campos nuevos. Intenta separarlos con comas.",
        },
      ]);
      setThinking(false);
    }, 600);
  }

  function updateField(id: string, patch: Partial<FormField>) {
    setFields((current) =>
      current.map((field) => (field.id === id ? { ...field, ...patch } : field)),
    );
  }

  function addField() {
    const field = makeField("Nuevo campo");
    setFields((current) => [...current, field]);
    setEditingId(field.id);
  }

  function useTemplate(template: (typeof formTemplates)[number]) {
    setName(template.name);
    setFields(template.fields.map(([label, type]) => makeField(label, type)));
    setEditingId(null);
    setTab("builder");
  }

  function save() {
    onSave({ id: formId, name: name.trim() || "Formulario sin título", fields });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  return (
    <section className="screen form-screen">
      <TopBar title={initial ? "Editar formulario" : "Nuevo formulario"} back={onBack} />
      <div className="page-content">
        <div className="method-tabs" role="tablist" aria-label="Secciones del formulario">
          <button
            role="tab"
            aria-selected={tab === "builder"}
            className={tab === "builder" ? "active" : ""}
            onClick={() => setTab("builder")}
          >
            <Icon name="form" size={20} />
            Constructor
          </button>
          <button
            role="tab"
            aria-selected={tab === "templates"}
            className={tab === "templates" ? "active" : ""}
            onClick={() => setTab("templates")}
          >
            <Icon name="template" size={20} />
            Plantillas
          </button>
        </div>

        {tab === "templates" ? (
          <div className="template-list">
            <h2>Plantillas</h2>
            <p>Elige una base y personalízala. Reemplazará los campos actuales.</p>
            {formTemplates.map((template) => (
              <div className="template-card" key={template.id}>
                <div>
                  <b>{template.name}</b>
                  <small>{template.description}</small>
                  <div className="chip-row">
                    {template.fields.map(([label]) => (
                      <span key={label}>{label}</span>
                    ))}
                  </div>
                </div>
                <Button secondary onClick={() => useTemplate(template)}>
                  Usar plantilla
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="builder-name">
              <Input label="Nombre del formulario" value={name} onChange={setName} />
            </div>

            <div className="ai-chat" aria-label="Asistente de IA">
              <div className="ai-chat-head">
                <span>
                  <Icon name="spark" size={18} />
                </span>
                <b>Asistente de IA</b>
              </div>
              <div className="chat-log" aria-live="polite">
                {messages.map((message, index) => (
                  <p key={index} className={`bubble ${message.from}`}>
                    {message.text}
                  </p>
                ))}
                {thinking && <p className="bubble ai">Escribiendo…</p>}
              </div>
              <form
                className="chat-input"
                onSubmit={(event) => {
                  event.preventDefault();
                  send();
                }}
              >
                <input
                  aria-label="Describe los campos del formulario"
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Ej. nombre, correo y fecha de llegada"
                />
                <button type="submit" aria-label="Enviar" disabled={!prompt.trim() || thinking}>
                  <Icon name="send" size={20} />
                </button>
              </form>
            </div>

            <div className="section-heading">
              <h3>Campos ({fields.length})</h3>
              <button onClick={addField}>
                <Icon name="plus" size={17} />
                Agregar campo
              </button>
            </div>
            {fields.length === 0 && (
              <div className="empty-state">
                <Icon name="form" size={26} />
                <p>Sin campos. Usa la IA, una plantilla o agrega uno manual.</p>
              </div>
            )}
            <div className="builder-fields">
              {fields.map((field) =>
                editingId === field.id ? (
                  <div className="field-editor" key={field.id}>
                    <Input
                      label="Etiqueta del campo"
                      value={field.label}
                      onChange={(value) => updateField(field.id, { label: value })}
                      error={field.label.trim() ? undefined : "La etiqueta es obligatoria"}
                    />
                    <label className="input-group">
                      <span>Tipo de dato</span>
                      <select
                        value={field.type}
                        onChange={(event) =>
                          updateField(field.id, { type: event.target.value as FieldType })
                        }
                      >
                        {fieldTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="checkbox-row">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(event) =>
                          updateField(field.id, { required: event.target.checked })
                        }
                      />
                      <span>
                        <Icon name="check" size={16} />
                      </span>
                      <p>Campo obligatorio</p>
                    </label>
                    <Button onClick={() => setEditingId(null)} disabled={!field.label.trim()}>
                      Listo
                      <Icon name="check" />
                    </Button>
                  </div>
                ) : (
                  <div className="builder-field" key={field.id}>
                    <div>
                      <b>{field.label}</b>
                      <small>
                        {fieldTypes.find((type) => type.value === field.type)?.label} ·{" "}
                        {field.required ? "Obligatorio" : "Opcional"}
                      </small>
                    </div>
                    <button
                      aria-label={`Editar ${field.label}`}
                      onClick={() => setEditingId(field.id)}
                    >
                      <Icon name="edit" size={20} />
                    </button>
                    <button
                      className="danger"
                      aria-label={`Borrar ${field.label}`}
                      onClick={() =>
                        setFields((current) => current.filter((item) => item.id !== field.id))
                      }
                    >
                      <Icon name="trash" size={20} />
                    </button>
                  </div>
                ),
              )}
            </div>
            {initial && (
              <button className="delete-form" onClick={() => onDelete(formId)}>
                <Icon name="trash" size={18} />
                Eliminar formulario
              </button>
            )}
          </>
        )}
      </div>
      {tab === "builder" && (
        <div className="sticky-action">
          <Button
            onClick={save}
            disabled={fields.length === 0 || fields.some((field) => !field.label.trim())}
          >
            {saved ? "Formulario guardado" : "Guardar formulario"}
            <Icon name="check" />
          </Button>
        </div>
      )}
    </section>
  );
}

interface Account {
  alias: string;
  email: string;
  notifEmail: boolean;
  notifApp: boolean;
}

function Switch({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="pref-row">
      <div>
        <b id={`sw-${label}`}>{label}</b>
        <small>{description}</small>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-labelledby={`sw-${label}`}
        className={`switch ${checked ? "on" : ""}`}
        onClick={() => onChange(!checked)}
      >
        <i />
        <span>{checked ? "Sí" : "No"}</span>
      </button>
    </div>
  );
}

function BusinessProfile({
  account,
  onChange,
  onNavigate,
  onLogout,
  onDelete,
}: {
  account: Account;
  onChange: (account: Account) => void;
  onNavigate: (item: "home" | "create") => void;
  onLogout: () => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState<"company" | "email" | "password" | null>(null);
  const [alias, setAlias] = useState(account.alias);
  const [email, setEmail] = useState(account.email);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [dialog, setDialog] = useState<"logout" | "delete" | null>(null);
  const [typed, setTyped] = useState("");
  const [notice, setNotice] = useState("");

  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const passwordValid = password.length >= 8 && password === confirm;

  function done(message: string) {
    setEditing(null);
    setPassword("");
    setConfirm("");
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2500);
  }

  function open(next: "company" | "email" | "password") {
    setAlias(account.alias);
    setEmail(account.email);
    setEditing(editing === next ? null : next);
  }

  const rows: {
    id: "company" | "email" | "password";
    icon: IconName;
    label: string;
    value: string;
  }[] = [
    { id: "company", icon: "briefcase", label: "Perfil de empresa", value: account.alias },
    { id: "email", icon: "mail", label: "Correo", value: account.email },
    { id: "password", icon: "lock", label: "Contraseña", value: "••••••••" },
  ];

  return (
    <>
      <section className="screen with-nav">
        <TopBar title="Perfil" />
        <div className="page-content">
          <div className="profile-hero">
            <span className="brand-avatar">{account.alias.slice(0, 2).toUpperCase()}</span>
            <div>
              <b>{account.alias}</b>
              <small>{account.email}</small>
            </div>
          </div>
          {notice && (
            <p className="toast" role="status">
              <Icon name="check" size={18} />
              {notice}
            </p>
          )}

          <h3 className="group-title">Tu cuenta</h3>
          <div className="settings-group">
            {rows.map((row) => (
              <div key={row.id}>
                <button
                  className="settings-row"
                  aria-expanded={editing === row.id}
                  onClick={() => open(row.id)}
                >
                  <span>
                    <Icon name={row.icon} size={22} />
                  </span>
                  <div>
                    <small>{row.label}</small>
                    <b>{row.value}</b>
                  </div>
                  <Icon name="chevron" size={20} />
                </button>
                {editing === row.id && (
                  <div className="row-editor">
                    {row.id === "company" && (
                      <>
                        <Input label="Alias del negocio" value={alias} onChange={setAlias} />
                        <Button
                          disabled={alias.trim().length < 2}
                          onClick={() => {
                            onChange({ ...account, alias: alias.trim() });
                            done("Perfil de empresa actualizado");
                          }}
                        >
                          Guardar cambios
                        </Button>
                      </>
                    )}
                    {row.id === "email" && (
                      <>
                        <Input
                          label="Correo electrónico"
                          type="email"
                          value={email}
                          onChange={setEmail}
                          error={email && !emailValid ? "Ingresa un correo válido" : undefined}
                        />
                        <Button
                          disabled={!emailValid}
                          onClick={() => {
                            onChange({ ...account, email: email.trim() });
                            done("Correo actualizado");
                          }}
                        >
                          Guardar cambios
                        </Button>
                      </>
                    )}
                    {row.id === "password" && (
                      <>
                        <Input
                          label="Nueva contraseña"
                          type="password"
                          value={password}
                          onChange={setPassword}
                          error={
                            password && password.length < 8
                              ? "Usa al menos 8 caracteres"
                              : undefined
                          }
                        />
                        <Input
                          label="Confirmar contraseña"
                          type="password"
                          value={confirm}
                          onChange={setConfirm}
                          error={
                            confirm && confirm !== password
                              ? "Las contraseñas no coinciden"
                              : undefined
                          }
                        />
                        <Button
                          disabled={!passwordValid}
                          onClick={() => done("Contraseña actualizada")}
                        >
                          Actualizar contraseña
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <h3 className="group-title">Preferencias</h3>
          <div className="settings-group">
            <Switch
              label="Notificaciones por correo"
              description="Recibe avisos de pagos y registros nuevos."
              checked={account.notifEmail}
              onChange={(value) => onChange({ ...account, notifEmail: value })}
            />
            <Switch
              label="Notificaciones de la app"
              description="Alertas push cuando un cliente paga."
              checked={account.notifApp}
              onChange={(value) => onChange({ ...account, notifApp: value })}
            />
          </div>

          <div className="account-actions">
            <button className="logout-button" onClick={() => setDialog("logout")}>
              <Icon name="logout" size={20} />
              Cerrar sesión
            </button>
            <button className="delete-account" onClick={() => setDialog("delete")}>
              <Icon name="trash" size={20} />
              Eliminar cuenta
            </button>
          </div>
        </div>
        <BottomNav
          active="profile"
          onNavigate={(item) => item !== "profile" && item !== "pay" && onNavigate(item)}
        />
      </section>

      {dialog && (
        <div className="modal-backdrop" onClick={() => setDialog(null)}>
          <div
            className="modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <span className={`modal-icon ${dialog === "delete" ? "danger" : ""}`}>
              <Icon name={dialog === "delete" ? "trash" : "logout"} size={26} />
            </span>
            <h2 id="dialog-title">
              {dialog === "delete" ? "¿Eliminar tu cuenta?" : "¿Cerrar sesión?"}
            </h2>
            <p>
              {dialog === "delete"
                ? "Se borrarán tu negocio, formularios y registros de cobro. Esta acción no se puede deshacer."
                : "Tus datos se conservarán y podrás volver a entrar cuando quieras."}
            </p>
            {dialog === "delete" && (
              <Input
                label='Escribe "ELIMINAR" para confirmar'
                value={typed}
                onChange={setTyped}
                placeholder="ELIMINAR"
              />
            )}
            <div className="modal-actions">
              <Button
                secondary
                onClick={() => {
                  setDialog(null);
                  setTyped("");
                }}
              >
                Cancelar
              </Button>
              {dialog === "delete" ? (
                <button
                  className="confirm-delete"
                  disabled={typed !== "ELIMINAR"}
                  onClick={onDelete}
                >
                  Eliminar
                </button>
              ) : (
                <Button onClick={onLogout}>Cerrar sesión</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

type AuthRole = "business" | "client";
interface StoredUser {
  username: string;
  email: string;
  hash: string;
  role: AuthRole;
}

async function hashCredentials(username: string, password: string) {
  const text = `${username.trim().toLowerCase()}::${password}`;
  try {
    const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return btoa(unescape(encodeURIComponent(text)));
  }
}

const userKey = (role: AuthRole, username: string) => `${role}:${username.trim().toLowerCase()}`;

function PasswordInput({
  label,
  value,
  onChange,
  error,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <label className={`input-group ${error ? "error" : ""}`}>
      <span>{label}</span>
      <div className="password-wrap">
        <input
          type={visible ? "text" : "password"}
          value={value}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
        />
        <button type="button" onClick={() => setVisible(!visible)} aria-pressed={visible}>
          {visible ? "Ocultar" : "Mostrar"}
        </button>
      </div>
      {error && (
        <small>
          <span>!</span>
          {error}
        </small>
      )}
    </label>
  );
}

function AuthScreen({
  mode,
  role,
  onBack,
  onSwitchMode,
  onSubmit,
}: {
  mode: "login" | "signup";
  role: AuthRole;
  onBack: () => void;
  onSwitchMode: () => void;
  onSubmit: (values: {
    username: string;
    email: string;
    password: string;
  }) => Promise<string | null>;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const signup = mode === "signup";
  const roleLabel = role === "business" ? "Empresa" : "Cliente";

  const problems = {
    username:
      signup && username && (username.trim().length < 3 || /\s/.test(username))
        ? "Mínimo 3 caracteres, sin espacios"
        : undefined,
    email:
      signup && email && !/^\S+@\S+\.\S+$/.test(email) ? "Ingresa un correo válido" : undefined,
    password: signup && password && password.length < 8 ? "Usa al menos 8 caracteres" : undefined,
    confirm: signup && confirm && confirm !== password ? "Las contraseñas no coinciden" : undefined,
  };
  const valid = signup
    ? username.trim().length >= 3 &&
      !/\s/.test(username) &&
      /^\S+@\S+\.\S+$/.test(email) &&
      password.length >= 8 &&
      confirm === password
    : username.trim().length > 0 && password.length > 0;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!valid || loading) return;
    setLoading(true);
    setError(await onSubmit({ username, email, password }));
    setLoading(false);
  }

  return (
    <section className="screen form-screen">
      <TopBar back={onBack} title={signup ? "Crear cuenta" : "Iniciar sesión"} />
      <form className="page-content auth-form" onSubmit={submit} noValidate>
        <span className="role-pill">
          <Icon name={role === "business" ? "briefcase" : "user"} size={16} />
          {roleLabel}
        </span>
        <h2>{signup ? "Crea tu cuenta" : "Bienvenido de nuevo"}</h2>
        <p>
          {signup
            ? "Solo te tomará un minuto empezar."
            : role === "business"
              ? "Entra para cobrar y gestionar tus formularios."
              : "Entra para pagar y administrar tus datos."}
        </p>
        <Input
          label="Usuario"
          value={username}
          onChange={setUsername}
          placeholder="tu.usuario"
          error={problems.username}
        />
        {signup && (
          <Input
            label="Correo"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="tu@correo.com"
            error={problems.email}
          />
        )}
        <PasswordInput
          label="Contraseña"
          value={password}
          onChange={setPassword}
          autoComplete={signup ? "new-password" : "current-password"}
          error={problems.password}
        />
        {signup && (
          <PasswordInput
            label="Confirmar contraseña"
            value={confirm}
            onChange={setConfirm}
            autoComplete="new-password"
            error={problems.confirm}
          />
        )}
        {error && (
          <p className="auth-error" role="alert">
            <Icon name="lock" size={18} />
            {error}
          </p>
        )}
        <Button type="submit" disabled={!valid || loading}>
          {loading ? <span className="loader" /> : <Icon name={signup ? "plus" : "arrow"} />}
          {signup ? "Crear cuenta" : "Iniciar sesión"}
        </Button>
        <div className="auth-divider">
          <i />
          <span>{signup ? "¿Ya tienes cuenta?" : "¿Aún no tienes cuenta?"}</span>
          <i />
        </div>
        <Button secondary onClick={onSwitchMode}>
          {signup ? "Iniciar sesión" : "Crear cuenta"}
        </Button>
      </form>
    </section>
  );
}

type NavItem = { label: string; view: View; icon: IconName; role?: AuthRole };
const sideNav: { title: string; items: NavItem[] }[] = [
  {
    title: "General",
    items: [
      { label: "Bienvenida", view: "welcome", icon: "spark" },
      { label: "Iniciar sesión", view: "login", icon: "lock" },
      { label: "Crear cuenta", view: "signup", icon: "plus" },
    ],
  },
  {
    title: "Empresa",
    items: [
      { label: "Inicio", view: "business", icon: "home", role: "business" },
      { label: "Registrar negocio", view: "register", icon: "briefcase", role: "business" },
      { label: "Crear", view: "hub", icon: "plus", role: "business" },
      { label: "Nuevo cobro", view: "create", icon: "wallet", role: "business" },
      { label: "Orden con QR", view: "order", icon: "qr", role: "business" },
      { label: "Formularios", view: "forms", icon: "form", role: "business" },
      { label: "Perfil", view: "bprofile", icon: "user", role: "business" },
    ],
  },
  {
    title: "Cliente",
    items: [
      { label: "Inicio", view: "client", icon: "home", role: "client" },
      { label: "Escanear QR", view: "scan", icon: "qr", role: "client" },
      { label: "Perfil maestro", view: "profile", icon: "user", role: "client" },
      { label: "Formulario de pago", view: "payform", icon: "form", role: "client" },
      { label: "Autorizar pago", view: "payprocess", icon: "bank", role: "client" },
      { label: "Confirmación", view: "success", icon: "check", role: "client" },
    ],
  },
];

function ScanScreen({
  onHome,
  onProfile,
  onScanned,
}: {
  onHome: () => void;
  onProfile: () => void;
  onScanned: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<"starting" | "live" | "denied" | "found">("starting");

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  function found() {
    stopCamera();
    setStatus("found");
    window.setTimeout(onScanned, 1000);
  }

  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    type Detector = { detect: (video: HTMLVideoElement) => Promise<{ rawValue: string }[]> };
    const Native = (
      window as unknown as {
        BarcodeDetector?: new (options: { formats: string[] }) => Detector;
      }
    ).BarcodeDetector;

    async function start() {
      if (!navigator.mediaDevices?.getUserMedia) return setStatus("denied");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (cancelled) return stream.getTracks().forEach((track) => track.stop());
        streamRef.current = stream;
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        await video.play();
        setStatus("live");
        if (Native) {
          const detector = new Native({ formats: ["qr_code"] });
          const tick = async () => {
            if (cancelled) return;
            try {
              if ((await detector.detect(video)).length) return found();
            } catch {
              // Frame not ready; try again.
            }
            frame = requestAnimationFrame(tick);
          };
          tick();
        }
      } catch {
        if (!cancelled) setStatus("denied");
      }
    }
    start();
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      stopCamera();
    };
  }, []);

  return (
    <section className="screen with-nav">
      <TopBar title="Pagar con QR" />
      <div className="page-content scan-page">
        <p className="scan-copy">Apunta la cámara al código QR del negocio para pagar.</p>
        <div className={`scan-viewport ${status}`}>
          <video ref={videoRef} muted playsInline aria-label="Vista de la cámara" />
          {status !== "found" && <span className="scan-line" />}
          <i className="corner tl" />
          <i className="corner tr" />
          <i className="corner bl" />
          <i className="corner br" />
          {status === "found" && (
            <div className="scan-found" role="status">
              <span>
                <Icon name="check" size={34} />
              </span>
              <b>Código detectado</b>
              <small>Enlace de pago detectado</small>
            </div>
          )}
        </div>
        <p className={`scan-status ${status}`} role="status">
          <Icon
            name={status === "denied" ? "lock" : status === "found" ? "check" : "qr"}
            size={18}
          />
          {status === "starting" && "Iniciando cámara…"}
          {status === "live" && "Buscando código QR…"}
          {status === "denied" &&
            "No pudimos usar la cámara. Revisa los permisos o simula el escaneo."}
          {status === "found" && "Preparando tu pago…"}
        </p>
      </div>
      <div className="scan-action">
        <Button onClick={found} disabled={status === "found"}>
          <Icon name="qr" />
          Simular escaneo
        </Button>
      </div>
      <BottomNav
        active="pay"
        hidden={["create"]}
        showPay
        layout={{ home: "row-reverse", profile: "row" }}
        onNavigate={(item) => {
          if (item === "home") onHome();
          if (item === "profile") onProfile();
        }}
      />
    </section>
  );
}

interface Payment {
  id: string;
  name: string;
  expediente: string;
  service: string;
  amount: number;
  fields: { label: string; value: string }[];
  at: number;
}

const samplePayment: Payment = {
  id: "PX-3812",
  name: "Sofía García",
  expediente: "MC-024",
  service: "Consulta psicológica",
  amount: 800,
  fields: [],
  at: 0,
};

const money = (value: number) =>
  `$${value.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

const defaultPayFields: FormField[] = [
  { id: "d1", label: "Nombre completo", type: "text", required: true },
  { id: "d2", label: "Teléfono", type: "tel", required: true },
  { id: "d3", label: "Número de expediente", type: "text", required: true },
];

function validateField(field: FormField, value: string, submitted: boolean): string | undefined {
  const text = value.trim();
  if (!text) return submitted && field.required ? "Este campo es obligatorio" : undefined;
  if (field.type === "tel" && text.replace(/\D/g, "").length !== 10)
    return "El teléfono debe tener 10 dígitos";
  if (field.type === "email" && !/^\S+@\S+\.\S+$/.test(text)) return "Ingresa un correo válido";
  if (field.type === "number" && Number.isNaN(Number(text))) return "Ingresa solo números";
  return undefined;
}

function PayForm({
  fields,
  formName,
  merchant,
  amount,
  concept,
  onBack,
  onSubmit,
}: {
  fields: FormField[];
  formName: string;
  merchant: string;
  amount: number;
  concept: string;
  onBack: () => void;
  onSubmit: (data: { label: string; value: string }[]) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const errors = fields.map((field) => validateField(field, values[field.id] ?? "", submitted));

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    const invalid = fields.some((field) => validateField(field, values[field.id] ?? "", true));
    if (invalid) return;
    onSubmit(
      fields
        .map((field) => ({ label: field.label, value: (values[field.id] ?? "").trim() }))
        .filter((item) => item.value),
    );
  }

  return (
    <section className="screen form-screen">
      <TopBar title="Formulario de pago" back={onBack} />
      <form className="page-content" onSubmit={submit} noValidate>
        <div className="merchant-summary">
          <span>{initials(merchant)}</span>
          <div>
            <small>COBRO DE {merchant.toUpperCase()}</small>
            <b>{concept}</b>
          </div>
          <strong>{money(amount)}</strong>
        </div>
        <div className="privacy-heading">
          <span>
            <Icon name="form" />
          </span>
          <div>
            <h2>{formName}</h2>
            <p>El negocio solicita solo estos {fields.length} datos.</p>
          </div>
        </div>
        {fields.map((field, index) => (
          <Input
            key={field.id}
            label={`${field.label}${field.required ? "" : " (opcional)"}`}
            type={field.type === "number" ? "text" : field.type}
            value={values[field.id] ?? ""}
            onChange={(value) => setValues({ ...values, [field.id]: value })}
            error={errors[index]}
          />
        ))}
        <div className="consent-copy">
          <Icon name="lock" size={17} />
          Tus datos se guardan de forma temporal y se vinculan a tu pago al confirmarse.
        </div>
        <div className="pay-submit">
          <Button type="submit">
            <Icon name="wallet" />
            Pagar {money(amount)}
          </Button>
        </div>
      </form>
    </section>
  );
}

const processSteps = [
  { actor: "Sistema", text: "Datos guardados temporalmente" },
  { actor: "API Pey", text: "Cobro enviado a Pey.mx" },
  { actor: "API Pey", text: "Notificación push enviada a tu banco" },
  { actor: "Cliente", text: "Autorizas con huella o PIN" },
  { actor: "Banxico", text: "Transferencia CoDi procesada" },
  { actor: "Sistema", text: "Webhook recibido y pago conciliado" },
];

function PayProcess({
  amount,
  merchant,
  onCancel,
  onDone,
}: {
  amount: number;
  merchant: string;
  onCancel: () => void;
  onDone: () => void;
}) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stage === 3) return; // Waits for the client's authorization.

    const advanceStage = async () => {
      // Si estamos en la etapa 2 (API Pey envía push a banco)
      if (stage === 2) {
        try {
          await fetch('/api/v1/push', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer sk_live_QvcVNZTTsdFmyAWN3MIOjDkzOjxR9_0td",
            },
            body: JSON.stringify({
              title: "Solicitud de pago CoDi",
              message: `${merchant} solicita ${money(amount)}`,
            }),
          });
          console.log("Notificación push enviada vía pey.mx");
        } catch (error) {
          console.error("Error al enviar push:", error);
        }
      }

      if (stage >= processSteps.length) {
        onDone();
      } else {
        setStage(stage + 1);
      }
    };

    const timer = window.setTimeout(advanceStage, 1000);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  return (
    <section className="screen form-screen">
      <TopBar title="Confirmando pago" />
      <div className="page-content process-page">
        <div className="payment-total">
          <small>MONTO A AUTORIZAR</small>
          <strong>{money(amount)}</strong>
          <span>{merchant} · 0% comisión</span>
        </div>
        <ol className="process-list" aria-live="polite">
          {processSteps.map((step, index) => {
            const state = index < stage ? "done" : index === stage ? "active" : "pending";
            return (
              <li key={step.text} className={state}>
                <span className="process-dot">
                  {state === "done" ? <Icon name="check" size={16} /> : index + 1}
                </span>
                <div>
                  <b>{step.text}</b>
                  <small>{step.actor}</small>
                </div>
                <em>
                  {state === "done" ? "Listo" : state === "active" ? "En curso" : "Pendiente"}
                </em>
              </li>
            );
          })}
        </ol>
        {stage === 3 && (
          <div className="bank-push" role="alert">
            <div className="bank-notification">
              <span>
                <Icon name="bell" />
              </span>
              <p>
                <small>Tu app bancaria · ahora</small>
                <b>
                  {merchant} solicita {money(amount)}
                </b>
              </p>
            </div>
            <Button onClick={() => setStage(4)}>
              <Icon name="lock" />
              Autorizar con huella o PIN
            </Button>
          </div>
        )}
        {stage < 3 && (
          <button className="cancel-link" onClick={onCancel}>
            Cancelar y volver
          </button>
        )}
      </div>
    </section>
  );
}

export default function App() {
  const [view, setView] = useState<View>("welcome");
  const [registered, setRegistered] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [paid, setPaid] = useState(false);
  const [amount, setAmount] = useState("800");
  const [concept, setConcept] = useState("Consulta psicológica");
  // ✅ CORRECCIÓN #2: estado para el QR generado por Pey.mx
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [forms, setForms] = useState<SavedForm[]>([]);
  const [editingForm, setEditingForm] = useState<string | undefined>();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [alertPayment, setAlertPayment] = useState<Payment | null>(null);
  const [pendingData, setPendingData] = useState<{ label: string; value: string }[]>([]);
  const paymentsRef = useRef<Payment[]>([]);
  const [authRole, setAuthRole] = useState<AuthRole>("business");
  const [users, setUsers] = useState<Record<string, StoredUser>>({});
  const [sessionKey, setSessionKey] = useState<string | null>(null);
  const [account, setAccount] = useState<Account>({
    alias: "Mente Clara",
    email: "contacto@menteclara.mx",
    notifEmail: true,
    notifApp: true,
  });

  useEffect(() => {
    const saved = window.localStorage.getItem("codi-demo-state");
    if (saved) {
      try {
        const state = JSON.parse(saved);
        setRegistered(Boolean(state.registered));
        setHasProfile(Boolean(state.hasProfile));
        setPaid(Boolean(state.paid));
        if (Array.isArray(state.forms)) setForms(state.forms);
        if (state.users && typeof state.users === "object") setUsers(state.users);
        if (Array.isArray(state.payments)) setPayments(state.payments);
        if (state.account) setAccount((current) => ({ ...current, ...state.account }));
        if (typeof state.qrUrl === "string") setQrUrl(state.qrUrl);
      } catch {
        window.localStorage.removeItem("codi-demo-state");
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "codi-demo-state",
      JSON.stringify({ registered, hasProfile, paid, forms, account, users, payments, qrUrl }),
    );
  }, [registered, hasProfile, paid, forms, account, users, payments, qrUrl]);

  useEffect(() => {
    paymentsRef.current = payments;
  }, [payments]);

  // Polling: the business screen checks for reconciled payments every 3 seconds.
  useEffect(() => {
    if (view !== "business") return;
    const timer = window.setInterval(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem("codi-demo-state") || "{}");
        const incoming: Payment[] = Array.isArray(saved.payments) ? saved.payments : [];
        const known = new Set(paymentsRef.current.map((item) => item.id));
        const fresh = incoming.filter((item) => !known.has(item.id));
        if (fresh.length) {
          setPayments([...paymentsRef.current, ...fresh]);
          setAlertPayment(fresh[fresh.length - 1]);
        }
      } catch {
        // Ignore unreadable storage.
      }
    }, 3000);
    return () => window.clearInterval(timer);
  }, [view]);

  function completePayment() {
    const nameField =
      pendingData.find((field) => /nombre|alumno|hu[eé]sped|paciente/i.test(field.label)) ??
      pendingData[0];
    const fileField = pendingData.find((field) => /expediente|folio|reserva/i.test(field.label));
    let id = `PX-${Math.floor(1000 + Math.random() * 9000)}`;
    while (paymentsRef.current.some((item) => item.id === id))
      id = `PX-${Math.floor(1000 + Math.random() * 9000)}`;
    const payment: Payment = {
      id,
      name: nameField?.value || "Cliente",
      expediente: fileField?.value || "—",
      service: concept,
      amount: Number(amount) || 0,
      fields: pendingData,
      at: Date.now(),
    };
    setPayments([...paymentsRef.current, payment]);
    setAlertPayment(payment);
    setPaid(true);
    setView("success");
  }

  const screen = useMemo(() => {
    switch (view) {
      case "welcome":
        return (
          <Welcome
            onStart={(role) => {
              setAuthRole(role);
              setView("login");
            }}
          />
        );
      case "login":
      case "signup":
        return (
          <AuthScreen
            key={`${view}-${authRole}`}
            mode={view}
            role={authRole}
            onBack={() => setView("welcome")}
            onSwitchMode={() => setView(view === "login" ? "signup" : "login")}
            onSubmit={async ({ username, email, password }) => {
              const key = userKey(authRole, username);
              const hash = await hashCredentials(username, password);
              const existing = users[key];
              if (view === "signup") {
                if (existing) return "Ese usuario ya existe. Elige otro o inicia sesión.";
                setUsers({
                  ...users,
                  [key]: { username: username.trim(), email: email.trim(), hash, role: authRole },
                });
                if (authRole === "business")
                  setAccount((current) => ({ ...current, email: email.trim() }));
              } else {
                if (!existing) return "No encontramos esa cuenta. Crea una cuenta para continuar.";
                if (existing.hash !== hash) return "Usuario o contraseña incorrectos.";
                if (authRole === "business")
                  setAccount((current) => ({ ...current, email: existing.email }));
              }
              setSessionKey(key);
              setView(authRole === "business" ? "business" : "client");
              return null;
            }}
          />
        );
      case "business":
        return (
          <BusinessHome
            registered={registered}
            payments={payments}
            alert={alertPayment}
            onDismissAlert={() => setAlertPayment(null)}
            alias={account.alias}
            onProfile={() => setView("bprofile")}
            onRegister={() => setView("register")}
            onCreate={() => setView(registered ? "hub" : "register")}
          />
        );
      case "hub":
        return (
          <CreateHub
            forms={forms}
            onProfile={() => setView("bprofile")}
            onBack={() => setView("business")}
            onCharge={() => setView("create")}
            onNewForm={() => {
              setEditingForm(undefined);
              setView("forms");
            }}
            onEditForm={(id) => {
              setEditingForm(id);
              setView("forms");
            }}
          />
        );
      case "bprofile":
        return (
          <BusinessProfile
            account={account}
            onChange={setAccount}
            onNavigate={(item) => setView(item === "home" ? "business" : "hub")}
            onLogout={() => {
              setSessionKey(null);
              setView("welcome");
            }}
            onDelete={() => {
              if (sessionKey) {
                const { [sessionKey]: _removed, ...rest } = users;
                setUsers(rest);
                setSessionKey(null);
              }
              setRegistered(false);
              setPaid(false);
              setPayments([]);
              setAlertPayment(null);
              setForms([]);
              setQrUrl(null);
              setAccount({
                alias: "Mente Clara",
                email: "contacto@menteclara.mx",
                notifEmail: true,
                notifApp: true,
              });
              setView("welcome");
            }}
          />
        );
      case "forms":
        return (
          <FormBuilder
            key={editingForm ?? "new"}
            initial={forms.find((form) => form.id === editingForm)}
            onBack={() => setView("hub")}
            onSave={(form) =>
              setForms((current) =>
                current.some((item) => item.id === form.id)
                  ? current.map((item) => (item.id === form.id ? form : item))
                  : [...current, form],
              )
            }
            onDelete={(id) => {
              setForms((current) => current.filter((form) => form.id !== id));
              setView("hub");
            }}
          />
        );
      case "register":
        return (
          <RegisterBusiness
            onBack={() => setView("business")}
            onDone={() => {
              setRegistered(true);
              setView("business");
            }}
          />
        );
      case "create":
        return (
          <CreateCharge
            onBack={() => setView("hub")}
            onCreated={(nextAmount, nextConcept, nextQr) => {
              setAmount(nextAmount);
              setConcept(nextConcept);
              setQrUrl(nextQr);
              setView("order");
            }}
          />
        );
      case "order":
        return (
          <OrderReady
            amount={amount}
            concept={concept}
            qrUrl={qrUrl}
            onBack={() => setView("create")}
            onClient={() => setView("payform")}
          />
        );
      case "client":
        return (
          <ClientHome
            hasProfile={hasProfile}
            onProfile={() => setView("profile")}
            onScan={() => setView("scan")}
            onPay={() => setView("payform")}
            onSwitch={() => setView("business")}
          />
        );
      case "scan":
        return (
          <ScanScreen
            onHome={() => setView("client")}
            onProfile={() => setView("profile")}
            onScanned={() => setView("payform")}
          />
        );
      case "profile":
        return (
          <ProfileForm
            onBack={() => setView("client")}
            onDone={() => {
              setHasProfile(true);
              setView("client");
            }}
          />
        );
      case "payform":
        return (
          <PayForm
            fields={forms.length ? forms[forms.length - 1].fields : defaultPayFields}
            formName={forms.length ? forms[forms.length - 1].name : "Consulta"}
            merchant={account.alias}
            amount={Number(amount) || 0}
            concept={concept}
            onBack={() => setView("client")}
            onSubmit={(data) => {
              setPendingData(data);
              setView("payprocess");
            }}
          />
        );
      case "payprocess":
        return (
          <PayProcess
            amount={Number(amount) || 0}
            merchant={account.alias}
            onCancel={() => setView("payform")}
            onDone={completePayment}
          />
        );
      case "success":
        return (
          <Success
            payment={payments[payments.length - 1] ?? samplePayment}
            merchant={account.alias}
            onHome={() => setView("client")}
            onBusiness={() => setView("business")}
          />
        );
    }
  }, [
    view,
    registered,
    hasProfile,
    paid,
    amount,
    concept,
    qrUrl, // ✅ añadido a las dependencias del useMemo
    forms,
    editingForm,
    account,
    users,
    authRole,
    payments,
    alertPayment,
    pendingData,
  ]);

  return (
    <main className="app-background">
      <aside className="side-nav">
        <div className="side-brand">
          <span>
            <Icon name="spark" size={22} />
          </span>
          <div>
            <b>PeyForm</b>
            <small>Navegación del prototipo</small>
          </div>
        </div>
        <nav aria-label="Pantallas del prototipo">
          {sideNav.map((group) => (
            <div className="side-group" key={group.title}>
              <h2>{group.title}</h2>
              {group.items.map((item) => (
                <button
                  key={`${group.title}-${item.label}`}
                  className={
                    view === item.view &&
                    (!item.role || item.role === authRole || !["login", "signup"].includes(view))
                      ? "active"
                      : ""
                  }
                  aria-current={view === item.view ? "page" : undefined}
                  onClick={() => {
                    if (item.role) setAuthRole(item.role);
                    if (item.view === "forms") setEditingForm(undefined);
                    setView(item.view);
                  }}
                >
                  <Icon name={item.icon} size={20} />
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <div className="desktop-context" aria-hidden="true">
        <span>
          <Icon name="spark" size={28} />
        </span>
        <p>Prototipo móvil interactivo</p>
        <h2>
          Pagos y datos,
          <br />
          por fin juntos.
        </h2>
        <small>Explora el flujo completo dentro del dispositivo.</small>
      </div>
      <div className="mobile-app">{screen}</div>
      <div className="demo-tag">
        <i />
        Modo demostración
      </div>
    </main>
  );
}