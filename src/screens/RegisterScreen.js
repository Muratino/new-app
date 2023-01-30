import React from "react";
import * as yup from "yup";
import Form from "../components/form/Form";
import InfoBlock from "../components/InfoBlock";

const RegisterScreen = () => {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    secondName: "",
    nick: "",
    phone: "",
    file: [],
    preferowaneMiastaPracy: "",
    dopuszczalneMiastaPracy: "",
    preferowanyZakresPrac: "",
    zakresPrac: "",
    umowaPracę: "",
    firstCheckbox: "",
  };

  const UpdateUserSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    secondName: yup.string().required(),
    nick: yup.string().required(),
    phone: yup.string().min(10).required(),
    preferowaneMiastaPracy: yup.string().required(),
    dopuszczalneMiastaPracy: yup.string().required(),
    preferowanyZakresPrac: yup.string().required(),
    umowaPracę: yup.string().required(),
    firstCheckbox: yup.string().required("The one of them must be accepted."),
  });

  const elements = {
    left: [
      { name: "email", label: "Adres e-mail/login", type: "input" },
      { name: "password", label: "Hasło", type: "input" },
      { name: "name", label: "Imię", type: "input" },
      { name: "secondName", label: "Nazwisko", type: "input" },
      { name: "nick", label: "Twój NICK", type: "input" },
      { name: "phone", label: "Telefon", type: "input" },
      { name: "file", label: "Dodaj zdjęcie/Avatar", type: "file" },
    ],
    right: [
      {
        type: "select",
        name: "preferowaneMiastaPracy",
        label: "Preferowane miasta pracy",
        option: [
          { name: "warszawa", label: "warszawa" },
          { name: "poznań", label: "Poznań" },
        ],
      },
      {
        type: "select",
        name: "dopuszczalneMiastaPracy",
        label: "Dopuszczalne miasta pracy",
        option: [
          { name: "warszawa", label: "warszawa" },
          { name: "poznań", label: "Poznań" },
        ],
      },
      {
        type: "selectAndInput",
        select: {
          type: "select",
          name: "preferowanyZakresPrac",
          label: "Preferowany zakres prac",
          option: [
            {
              name: "montażKonstrukcjiScenicznych",
              label: "Montaż konstrukcji scenicznych",
            },
            { name: "montażEkranówLED", label: "Montaż ekranów LED" },
            {
              name: "programowanieEkranówLED",
              label: "Programowanie Ekranów LED",
            },
          ],
        },
        input: {
          type: "input",
          name: "zakresPrac",
          label: "Preferowany zakres prac nieujęty na liście",
        },
      },
      {
        type: "select",
        name: "umowaPracę",
        label: "Preferowany zakres prac",
        option: [
          { name: "umowaPracę", label: "Umowa o pracę" },
          { name: "umowaDzieło", label: "Umowa o dzieło" },
        ],
      },
      {
        type: "text",
        text: "Jak informować Cię o nowych odpowiedziach na ogłoszenia?",
      },
      {
        type: "checkbox",
        name: "firstCheckbox",
        element: [
          { name: "sms", label: "SMS", default: false },
          { name: "checkboxEmail", label: "e-mail", default: false },
          { name: "push", label: "PUSH", default: false },
        ],
      },
    ],
  };

  return (
    <div className="mt-16">
      <InfoBlock
        title={"UZUPEŁNIJ DANE,ŻEBYŚMY MOGLI DOPASOWAĆ DLA CIEBIE OGŁOSZENIA"}
      />
      <Form
        UpdateUserSchema={UpdateUserSchema}
        defaultValues={defaultValues}
        elements={elements}
      />
    </div>
  );
};

export default RegisterScreen;
