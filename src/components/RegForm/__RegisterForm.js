import { React, useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";

function useStateValue(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const onChange = (e) => {
    const variable = value.length > 0 ? value + ";" : "";
    setValue(variable + e.target.innerHTML);
  };
  return { value, onChange };
}

const RegisterForm = () => {
  const { request } = useHttp();

  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [selector, setSelector] = useState(null);

  const preferredWork = useStateValue("");
  const preferredCity = useStateValue("");
  const acceptableCity = useStateValue("");
  const contract = useStateValue("");

  const language = useStateValue("");
  const certificate = useStateValue("");

  const skill = useStateValue("");
  const supportDevices = useStateValue("");
  const ownDevices = useStateValue("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const [nick, setNick] = useState("");
  const [number, setNumber] = useState("");
  const [file, setFile] = useState("");
  const [zakresPracyInput, setZakresPracyInput] = useState("");
  const [checkboxSMS, setCheckboxSMS] = useState(false);
  const [checkboxEMAIL, setCheckboxEMAIL] = useState(false);
  const [checkboxPUSH, setCheckboxPUSH] = useState(false);

  useEffect(() => {
    const getData = () => {
      request(`https://cross-rental.newsystems.pl/admin/site/register?api=true`)
        .then((item) => setData(item.data))
        .catch((e) => console.log(e));
    };
    getData();
  }, []);

  const toogleDisplayClass = () => {
    setShow(!show);
  };

  const selectDropdown = (e) => {
    eval(e.target.dataset.name).onChange(e);
    e.target.remove();
  };

  const onSearch = (e) => {
    let search = e.target.value.toUpperCase();
    const div = document.getElementById(
      e.target.id.slice(0, e.target.id.length - 6) + "-search"
    );
    const a = div.getElementsByTagName("a");
    for (let i = 0; i < a.length; i++) {
      let txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(search) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  };

  const showSelect = (e) => {
    const div = document.getElementById(e.target.id.slice(4) + "-search");
    setSelector(e.target.id.slice(4) + "-search");
    div.style.display = "block";
  };

  const clickBody = (e) => {
    if (selector) {
      if (
        e.target.tagName.toLowerCase() !== "a" &&
        e.target.tagName.toLowerCase() !== "input"
      ) {
        document.getElementById(selector).style.display = "none";
        setSelector(null);
      }
    }
  };

  const changeInput = (value, fun) => {
    fun(value);
  };

  const saveForm = () => {
    const obj = {
      email,
      password,
      name,
      nazwisko,
      nick,
      number,
      file,
      zakresPracyInput,
      checkboxSMS,
      checkboxEMAIL,
      checkboxPUSH,
      preferredWork: preferredWork?.value,
      preferredCity: preferredCity?.value,
      acceptableCity: acceptableCity?.value,
      contract,
    };
    const jsonData = JSON.stringify(obj);
    // request(
    //   "https://cross-rental.newsystems.pl/admin/site/register?api=true",
    //   "POST",
    //   jsonData
    // )
    fetch("https://cross-rental.newsystems.pl/admin/site/register?api=true", {
      method: "POST",
      mode: "cors",
      headers: { "content-type": "application/json" },
      body: jsonData,
    })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <form
        id="register-form"
        style={{ marginTop: "50px", marginBottom: "20px" }}
        onClick={clickBody}
      >
        <div
          className={`site-register ${!show ? "" : "d-none"}`}
          id="first"
          style={{ padding: "0px 0 0 41px" }}
        >
          <div className="mt-5 offset-lg-3 row register-box-body">
            <div className="col-md-4">
              <div className="form-group field-user-email required">
                <label className="control-label" htmlFor="user-email">
                  Adres e-mail/login
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => changeInput(e.target.value, setEmail)}
                  id="user-email"
                  className="input-login form-control required"
                  name="User[email]"
                  aria-required="true"
                />
                <div className="help-block"></div>
              </div>
              <div className="form-group field-user-password required">
                <label className="control-label" htmlFor="user-password">
                  Hasło
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => changeInput(e.target.value, setPassword)}
                  id="user-password"
                  className="input-login form-control required"
                  name="User[password]"
                  aria-required="true"
                />
                <div className="help-block"></div>
              </div>
              <div className="form-group field-user-first_name required">
                <label className="control-label" htmlFor="user-first_name">
                  Imię
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <input
                  type="text"
                  id="user-first_name"
                  value={name}
                  onChange={(e) => changeInput(e.target.value, setName)}
                  className="input-login form-control required"
                  name="User[first_name]"
                  aria-required="true"
                />
                <div className="help-block"></div>
              </div>
              <div className="form-group field-user-last_name required">
                <label className="control-label" htmlFor="user-last_name">
                  Nazwisko
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <input
                  type="text"
                  id="user-last_name"
                  value={nazwisko}
                  onChange={(e) => changeInput(e.target.value, setNazwisko)}
                  className="input-login form-control required"
                  name="User[last_name]"
                  aria-required="true"
                />
                <div className="help-block"></div>
              </div>
              <div className="form-group field-user-nickname required">
                <label className="control-label" htmlFor="user-nickname">
                  Twój NICK
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <input
                  type="text"
                  id="user-nickname"
                  value={nick}
                  onChange={(e) => changeInput(e.target.value, setNick)}
                  className="input-login form-control required"
                  name="User[nickname]"
                  aria-required="true"
                />
                <div className="help-block"></div>
              </div>
              <div className="form-group field-user-phone required">
                <label className="control-label" htmlFor="user-phone">
                  Telefon
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <input
                  type="text"
                  id="user-phone"
                  value={number}
                  onChange={(e) => changeInput(e.target.value, setNumber)}
                  className="input-login form-control required"
                  name="User[phone]"
                  aria-required="true"
                />
                <div className="help-block"></div>
              </div>
              <div className="row">
                <div
                  className="col-md-8"
                  style={{ margin: "30px auto", fontSize: "14px" }}
                >
                  Dodaj zdjęcie/Avatar
                </div>
                <div className="col-md-4">
                  <label htmlFor="user-file" className="file-image-link">
                    <div className="add-plus-orange"></div>
                  </label>
                </div>
              </div>
              <div className="form-group field-user-file">
                <label className="control-label" htmlFor="user-file">
                  File
                </label>
                <input type="hidden" name="User[file]" value="" />
                <input
                  type="file"
                  id="user-file"
                  name="User[file]"
                  value={file}
                  onChange={(e) => changeInput(e.target.value, setFile)}
                />
                <div className="help-block"></div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group input-div-control">
                <label className="control-label">
                  Preferowane miasta pracy
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <div
                  className="input-login form-control required"
                  data-id="preferred_city"
                  onClick={showSelect}
                  style={{ marginBottom: 10, minHeight: 34, height: "auto" }}
                  id="val-preferred_city"
                >
                  {preferredCity.value}
                </div>
                <div
                  id="preferred_city-search"
                  className="dropdown-content"
                  style={{ display: "none" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Wybierz.."
                    onChange={onSearch}
                    id="preferred_city-input"
                  />
                  {data?.cities.map((item) => (
                    <a
                      key={item.id}
                      href="#"
                      onClick={selectDropdown}
                      data-name="preferredCity"
                      data-value={item.id}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="form-group field-user-preferred_city required">
                <input
                  type="hidden"
                  id="user-preferred_city"
                  className="input-login form-control"
                  value={preferredCity.value}
                  name="User[preferred_city]"
                />
                <div className="help-block"></div>
              </div>
              <div className="form-group input-div-control">
                <label className="control-label">
                  Dopuszczalne miasta pracy
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <div
                  className="input-login form-control required"
                  data-id="acceptable_city"
                  onClick={showSelect}
                  style={{ marginBottom: 10, minHeight: 34, height: "auto" }}
                  id="val-acceptable_city"
                >
                  {acceptableCity.value}
                </div>

                <div
                  id="acceptable_city-search"
                  className="dropdown-content"
                  style={{ display: "none" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Wybierz.."
                    onChange={onSearch}
                    id="acceptable_city-input"
                  />
                  {data?.cities.map((item) => (
                    <a
                      key={item.id}
                      href="#"
                      onClick={selectDropdown}
                      data-name="acceptableCity"
                      data-value={item.id}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="form-group field-user-acceptable_city required">
                <input
                  type="hidden"
                  id="user-acceptable_city"
                  className="input-login form-control"
                  value={acceptableCity.value}
                  name="User[acceptable_city]"
                />
                <div className="help-block"></div>
              </div>
              <div className="row padding-border" style={{ marginBottom: 10 }}>
                <div className="form-group input-div-control">
                  <label className="control-label">
                    Preferowany zakres prac
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </label>
                  <div
                    className="input-login form-control required"
                    data-id="preferred_work"
                    onClick={showSelect}
                    style={{ marginBottom: 10, minHeight: 34, height: "auto" }}
                    id="val-preferred_work"
                  >
                    {preferredWork.value}
                  </div>
                  <div
                    id="preferred_work-search"
                    className="dropdown-content"
                    style={{ display: "none" }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Wybierz.."
                      id="preferred_work-input"
                    />
                    {data?.works.map((item) => (
                      <a
                        key={item.id}
                        href="#"
                        onClick={selectDropdown}
                        data-name="preferredWork"
                        data-value={item.id}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="form-group field-user-preferred_work required">
                  <input
                    type="hidden"
                    id="user-preferred_work"
                    className="input-login form-control"
                    value={preferredWork.value}
                    name="User[preferred_work]"
                  />
                  <div className="help-block"></div>
                </div>
                <div className="form-group field-user-add_work">
                  <label className="control-label" htmlFor="user-add_work">
                    Preferowany zakres prac nieujęty na liście
                    <span style={{ color: "#5EC1DB", marginLeft: 5 }}>
                      ( oddziel średnikiem ; )
                    </span>
                  </label>
                  <input
                    type="text"
                    id="user-add_work"
                    value={zakresPracyInput}
                    onChange={(e) =>
                      changeInput(e.target.value, setZakresPracyInput)
                    }
                    className="input-login form-control addititional"
                    name="User[add_work]"
                  />
                  <div className="help-block"></div>
                </div>
              </div>
              <div className="form-group input-div-control">
                <label className="control-label">
                  Preferowany zakres prac
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <div
                  className="input-login form-control required"
                  data-id="contract"
                  onClick={showSelect}
                  style={{ marginBottom: 10, minHeight: 34, height: "auto" }}
                  id="val-contract"
                >
                  {contract.value}
                </div>
                <div
                  id="contract-search"
                  className="dropdown-content"
                  style={{ display: "none" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Wybierz.."
                    id="contract-input"
                  />
                  {data?.contracts.map((item) => (
                    <a
                      key={item.id}
                      href="#"
                      onClick={selectDropdown}
                      data-name="contract"
                      data-value={item.id}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="form-group field-user-contract required">
                <input
                  type="hidden"
                  id="user-contract"
                  className="input-login form-control"
                  value={contract.value}
                  name="User[contract]"
                />
                <div className="help-block"></div>
              </div>
              <div className="row" style={{ margin: 0 }}>
                Jak informować Cię o nowych odpowiedziach na ogłoszenia?
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </div>
              <div
                className="row messages"
                style={{ display: "flex", margin: "10px 0 0 0" }}
              >
                <div className="form-group field-user-sms">
                  <input type="hidden" name="User[sms]" value="0" />
                  <label>
                    <input
                      type="checkbox"
                      id="user-sms"
                      name="User[sms]"
                      value="1"
                      checked={checkboxSMS}
                      onChange={(e) =>
                        changeInput(e.target.checked, setCheckboxSMS)
                      }
                    />{" "}
                    SMS
                  </label>
                  <div className="help-block"></div>
                </div>
                <div className="form-group field-user-mail">
                  <input type="hidden" name="User[mail]" value="0" />
                  <label>
                    <input
                      type="checkbox"
                      id="user-mail"
                      name="User[mail]"
                      value="1"
                      checked={checkboxEMAIL}
                      onChange={(e) =>
                        changeInput(e.target.checked, setCheckboxEMAIL)
                      }
                    />
                    e-mail
                  </label>
                  <div className="help-block"></div>
                </div>
                <div className="form-group field-user-push">
                  <input type="hidden" name="User[push]" value="0" />
                  <label>
                    <input
                      type="checkbox"
                      id="user-push"
                      name="User[push]"
                      value="1"
                      checked={checkboxPUSH}
                      onChange={(e) =>
                        changeInput(e.target.checked, setCheckboxPUSH)
                      }
                    />{" "}
                    push
                  </label>
                  <div className="help-block"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-5 text-center">
              <button
                type="button"
                id="first-next"
                onClick={toogleDisplayClass}
                // onClick={saveForm}
                className="regi-div"
                name="btn login-button"
              >
                Dalej
              </button>
            </div>
          </div>
        </div>
        <div
          className={`site-register ${show ? "" : "d-none"}`}
          id="second"
          style={{ padding: "0px 0 0 41px" }}
        >
          <div className="mt-5 offset-lg-3 row register-box-body">
            <div className="col-md-4">
              <div className="form-group input-div-control">
                <label className="control-label">
                  Znajomość języków obcych
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <div
                  className="input-login form-control required"
                  data-id="language"
                  onClick={showSelect}
                  style={{ marginBottom: 10, minHeight: 34, height: "auto" }}
                  id="val-language"
                >
                  {language.value}
                </div>
                <div
                  id="language-search"
                  className="dropdown-content"
                  style={{ display: "none" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Wybierz.."
                    id="language-input"
                  />
                  <a
                    href="#"
                    onClick={selectDropdown}
                    data-name="language"
                    data-value="1"
                  >
                    English
                  </a>
                  <a
                    href="#"
                    onClick={selectDropdown}
                    data-name="language"
                    data-value="2"
                  >
                    Polish
                  </a>
                  <a
                    href="#"
                    onClick={selectDropdown}
                    data-name="language"
                    data-value="3"
                  >
                    Ukraine
                  </a>
                </div>
              </div>
              <div className="form-group field-user-language required">
                <input
                  type="hidden"
                  id="user-language"
                  className="input-login form-control"
                  value={language.value}
                  name="User[language]"
                />
                <div className="help-block"></div>
              </div>
              <div className="row padding-border">
                <div className="form-group input-div-control">
                  <label className="control-label">
                    Posiadane certyfikaty
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </label>
                  <div
                    className="input-login form-control required"
                    data-id="certificate"
                    onClick={showSelect}
                    style={{ marginBottom: 10, minHeight: 34, height: "auto" }}
                    id="val-certificate"
                  >
                    {certificate.value}
                  </div>
                  <div
                    id="certificate-search"
                    className="dropdown-content"
                    style={{ display: "none" }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Wybierz.."
                      id="certificate-input"
                    />
                    <a
                      href="#"
                      onClick={selectDropdown}
                      data-name="certificate"
                      data-value="1"
                    >
                      Cisco
                    </a>
                    <a
                      href="#"
                      onClick={selectDropdown}
                      data-name="certificate"
                      data-value="2"
                    >
                      Microsoft
                    </a>
                  </div>
                </div>
                <div className="form-group field-user-certificate required">
                  <input
                    type="hidden"
                    id="user-certificate"
                    className="form-control"
                    value={certificate.value}
                    name="User[certificate]"
                  />
                  <div className="help-block"></div>
                </div>
                <div className="form-group field-user-add_certificate">
                  <label
                    className="control-label"
                    htmlFor="user-add_certificate"
                  >
                    Certyfikaty nieujęte na liście
                    <span style={{ color: "#5EC1DB", marginLeft: 5 }}>
                      ( oddziel średnikiem ; )
                    </span>
                  </label>
                  <input
                    type="text"
                    id="user-add_certificate"
                    className="input-login form-control addititional"
                    name="User[add_certificate]"
                  />
                  <div className="help-block"></div>
                </div>
              </div>
              <div className="form-group field-user-experience required">
                <label className="control-label" htmlFor="user-experience">
                  Doświadczenie zawodowe [Lata]
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <input
                  type="text"
                  id="user-experience"
                  className="input-login form-control required"
                  name="User[experience]"
                  aria-required="true"
                />
                <div className="help-block"></div>
              </div>
              <div className="form-group field-user-experience_description required">
                <label
                  className="control-label"
                  htmlFor="user-experience_description"
                >
                  Doświadczenie zawodowe
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <textarea
                  id="user-experience_description"
                  className="input-login form-control required"
                  name="User[experience_description]"
                  aria-required="true"
                ></textarea>
                <div className="help-block"></div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="row padding-border" style={{ marginBottom: 10 }}>
                <div className="form-group input-div-control">
                  <label className="control-label">
                    Umiejętności
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </label>
                  <div
                    className="input-login form-control required"
                    data-id="skill"
                    onClick={showSelect}
                    style={{ marginBottom: 10, minHeight: 34, height: "auto" }}
                    id="val-skill"
                  >
                    {skill.value}
                  </div>
                  <div
                    id="skill-search"
                    className="dropdown-content"
                    style={{ display: "none" }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Wybierz.."
                      id="skill-input"
                    />
                    <a
                      href="#"
                      onClick={selectDropdown}
                      data-name="skill"
                      data-value="1"
                    >
                      Realizator nagłośnienia
                    </a>
                    <a
                      href="#"
                      onClick={selectDropdown}
                      data-name="skill"
                      data-value="2"
                    >
                      Realizator Oświetlenia
                    </a>
                  </div>
                </div>
                <div className="form-group field-user-skill required">
                  <input
                    type="hidden"
                    id="user-skill"
                    className="form-control"
                    value={skill.value}
                    name="User[skill]"
                  />
                  <div className="help-block"></div>
                </div>
                <div className="form-group field-user-add_skill">
                  <label className="control-label" htmlFor="user-add_skill">
                    Umiejętności nieujęte na liście
                    <span style={{ color: "#5EC1DB", marginLeft: 5 }}>
                      ( oddziel średnikiem ; )
                    </span>
                  </label>
                  <input
                    type="text"
                    id="user-add_skill"
                    className="input-login form-control addititional"
                    name="User[add_skill]"
                  />
                  <div className="help-block"></div>
                </div>
              </div>

              <div className="row padding-border" style={{ marginBottom: 10 }}>
                <div className="form-group input-div-control">
                  <label className="control-label">
                    Obsługiwane urządzenia
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </label>
                  <div
                    className="input-login form-control required"
                    data-id="support_devices"
                    onClick={showSelect}
                    style={{ marginBottom: 10, minHeight: 34, height: "auto" }}
                    id="val-support_devices"
                  >
                    {supportDevices.value}
                  </div>
                  <div
                    id="support_devices-search"
                    className="dropdown-content"
                    style={{ display: "none" }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Wybierz.."
                      id="support_devices-input"
                    />
                    <a
                      href="#"
                      onClick={selectDropdown}
                      data-name="supportDevices"
                      data-value="1"
                    >
                      Barco HDX W20
                    </a>
                    <a
                      href="#"
                      onClick={selectDropdown}
                      data-name="supportDevices"
                      data-value="2"
                    >
                      Barco S3
                    </a>
                  </div>
                </div>
                <div className="form-group field-user-support_devices required">
                  <input
                    type="hidden"
                    id="user-support_devices"
                    className="form-control"
                    value={supportDevices.value}
                    name="User[support_devices]"
                  />
                  <div className="help-block"></div>
                </div>
                <div className="form-group field-user-add_devices">
                  <label className="control-label" htmlFor="user-add_devices">
                    Obsługiwane urządzenia nieujęte na liście
                    <span style={{ color: "#5EC1DB", marginLeft: 5 }}>
                      ( oddziel średnikiem ; )
                    </span>
                  </label>
                  <input
                    type="text"
                    id="user-add_devices"
                    className="input-login form-control addititional"
                    name="User[add_devices]"
                  />
                  <div className="help-block"></div>
                </div>
              </div>
              <div className="row padding-border" style={{ marginBottom: 10 }}>
                <div className="form-group input-div-control">
                  <label className="control-label">
                    Posiadane własne urządzenia
                  </label>
                  <div
                    className="input-login form-control"
                    data-id="own_devices"
                    onClick={showSelect}
                    style={{ marginBottom: 10, minHeight: 34, height: "auto" }}
                    id="val-own_devices"
                  >
                    {ownDevices.value}
                  </div>
                  <div
                    id="own_devices-search"
                    className="dropdown-content"
                    style={{ display: "none" }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Wybierz.."
                      id="own_devices-input"
                    />
                    <a
                      href="#"
                      onClick={selectDropdown}
                      data-name="ownDevices"
                      data-value="1"
                    >
                      Barco HDX W20
                    </a>
                    <a
                      href="#"
                      onClick={selectDropdown}
                      data-name="ownDevices"
                      data-value="2"
                    >
                      Barco S3
                    </a>
                  </div>
                </div>
                <div className="form-group field-user-own_devices">
                  <input
                    type="hidden"
                    id="user-own_devices"
                    className="form-control"
                    value={ownDevices.value}
                    name="User[own_devices]"
                  />
                  <div className="help-block"></div>
                </div>
                <div className="form-group field-user-add_own_devices">
                  <label
                    className="control-label"
                    htmlFor="user-add_own_devices"
                  >
                    Posiadane własne urządzenia nieujęte na liście
                  </label>
                  <input
                    type="text"
                    id="user-add_own_devices"
                    className="input-login form-control"
                    name="User[add_own_devices]"
                  />
                  <div className="help-block"></div>
                </div>
              </div>

              <div className="form-group field-user-regul">
                <input type="hidden" name="User[regul]" value="0" />
                <label>
                  <input
                    type="checkbox"
                    id="user-regul"
                    className="required"
                    name="User[regul]"
                    value="1"
                  />
                  Wyrażam zgodę na rejestracje, zapoznałem się z regulaminem
                </label>
                <div className="help-block"></div>
              </div>
              <div className="form-group field-user-rodo">
                <input type="hidden" name="User[rodo]" value="0" />
                <label>
                  <input
                    type="checkbox"
                    id="user-rodo"
                    className="required"
                    name="User[rodo]"
                    value="1"
                  />
                  Rodo check
                </label>
                <div className="help-block"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-5 text-center">
              <button
                type="button"
                id="second-back"
                // onClick={toogleDisplayClass}
                className="regi-div btn login-button"
              >
                Znow
              </button>
              <button
                  type="submit"
                  className="regi-div btn login-button"
                  onClick={saveForm}
              >
                Zarejestruj
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
