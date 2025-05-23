import loginService from "@/ApiService/loginService";
import submit from "@/assets/icon/next-icon-btn-nml.png";
import { Modal } from "@/components/EnnModal";
import SecondHeader from "@/components/secondHeader";
import useMailToken from "@/hooks/useMailToken";
import { Form, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useTimer from "../../hooks/useTimer";
import { FormBtn } from "../register/register";
import { Email_Reg } from "@/utils/regex";
import { useRegion } from "../../Provider/RegionProvider";
import { useState } from "react";

const NOT_FOUND_CODE = 404;

const crumbs = [{ name: "Find ID / PW", active: true }];

const inputClass = "w-full min-w-[100px] max-w-[350px] flex-1";

export default function FindID() {
  const { currentRegion } = useRegion();
  const csrf_token = useMailToken();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const { isSetDefault } = useSelector((state) => {
    return state.commonReducer.value;
  });
  const { startTimer, isTimerRunning, formattedTime } = useTimer({
    initialTime: 60 * 3,
  });

  const links = [
    { name: "Find ID", url: `/${currentRegion}/find-id` },
    { name: "Find Password", url: `/${currentRegion}/find-pw` },
  ];

  const sendEmailCode = async () => {
    if (isTimerRunning || csrf_token === "") return;

    const part1 = form.getFieldValue(["email", "part1"]);

    if (part1) {
      try {
        const email = part1;
        const res = await loginService.sendMailCode({
          email,
          csrf_token,
          type: "find_id",
        });

        if (res.success) {
          startTimer();
        }
      } catch (error) {
        Modal.warning("Message", error?.message, 3000);
      }
    }
  };

  const onFinish = async (values) => {
    const email = values.email.part1;
    if (!Email_Reg.test(email)) {
      Modal.warning("Invalid Email Format", email);
      return;
    }
  };

  const goNext = async () => {
    const formVal = form.getFieldValue();
    const email = formVal?.email?.part1;
    if (!Email_Reg.test(email)) {
      return;
    }
    const params = { ...formVal, ...{ email, csrf_token } };
    try {
      const res = await loginService.findID(params);
      if (res.status === NOT_FOUND_CODE) {
        Modal.warning("Failed to Find ID", res.data.msg);
      }
      if (res.success) {
        navigate(`/${currentRegion}/find-id/finish`, {
          replace: true,
          state: {
            idData: {
              ...res.data,
              email,
              mail_verify_code: params.mail_verify_code,
              csrf_token: csrf_token,
            },
          },
        });
      }
    } catch (error) {
      const data = error?.data?.msg;
      Modal.alert("Message", data, 3000);
    }
  };

  const notNullValidate = async (_, str) => {
    if (typeof str !== "string" || !str || str.trim() === "") {
      return Promise.reject(new Error(""));
    }
  };

  return (
    <div className=" h-max w-full bg-white">
      <SecondHeader crumbs={crumbs} links={links} />
      <div className="m-auto h-[200px] w-[1440px] px-[24px] pt-[100px] text-[24px] font-bold leading-[34px] md:text-[34px] md:leading-[48px] lg:text-[48px] lg:leading-[68px]">
        <span className={`${isSetDefault ? "defaultBtnBg" : ""}`}>Find ID</span>
      </div>
      <div
        className="mx-auto mb-[100px] flex w-full justify-center bg-[#F8F8F8]"
      >
        <Form
          className="py-[24px] px-[15px] flex flex-1 flex-col items-center"
          name="register"
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onValuesChange={() => {
            const checkEmail = Email_Reg.test(form.getFieldValue(["email", "part1"]));
            if (checkEmail) {
              setIsEmailValid(true);
            } else {
              setIsEmailValid(false);
            }
          }}
          autoComplete="off"
          scrollToFirstError>
          <Form.Item
          //수정중
            className="flex flex-1"
            label={<span className="w-[50px]">Email</span>}
            required>
            <div
            //변화
              className="flex flex-1 w-full">
              <Input className={inputClass} />
              <FormBtn
                className="!mr-0 ml-4 w-[65px]"
                text={"Send"}
              >
              </FormBtn>
            </div>
          </Form.Item>
          {/* <Form.Item
            className="mb-0 mt-[20px]"
            label={<span className="w-[50px]">Code</span>}
            required>
            <div
            className="flex items-center"
            >
              <Input className={inputClass} />
              <button
              className="flex items-start justify-center w-[65px] h-[65px] rounded-full ml-[12px] p-0 hover:bg-[#DDDDDD] active:bg-[#DDDDDD]">
                <img
                  className="w-[65px] h-[65px]"
                  src={submit}
                  alt=""
                  onClick={goNext}
                />
              </button>
            </div>
          </Form.Item> */}
        </Form>
      </div>
    </div>
  );
}
