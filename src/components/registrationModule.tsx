"use client";
import { useState, useRef, useCallback } from "react";
import TextInputBox from "./textInputBox";
import PasswordInputBox from "./passwordInputBox";
import React from "react";
import { Locale } from "../../i18n.config";
import { localeNameToLangName } from "@/lib/dictionaries";
import { getTextInputBoxOnChange } from "./textInputBox";
export default function RegistrationModule({
  params,
}: {
  params: {
    dict: {
      username: string;
      email: string;
      password: string;
      languagePreference: string;
    };
    lang: Locale;
  };
}) {
  const dict = params.dict;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [languagePreference, setLanguagePreference] = useState(
    localeNameToLangName[params.lang]
  );

  return (
    <div className=" flex">
      <div className=" basis-1/4"></div>
      <article className="prose">
        <h1>{dict.username}</h1>
        <TextInputBox
          value={username}
          onChange={getTextInputBoxOnChange(setUsername)}
        ></TextInputBox>
      </article>
      <div className=" basis-1/4"> </div>
    </div>
  );
}
