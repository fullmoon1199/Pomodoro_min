import { useEffect, useState } from "react";

function Person() {
  const [personalInfo, setPersonalInfo] = useState(null);

  const getPersonalInfo = async () => {
    const response = await fetch("https://randomuser.me/api/");
    const json = await response.json();
    console.log("API Response:", json); // API 응답 데이터 확인
    setPersonalInfo(json.results[0]); // API 데이터에서 첫 번째 사용자 정보 저장
  };

  useEffect(() => {
    getPersonalInfo();
  }, []);

  return (
    <div>
      <h1>Personal Info</h1>
      {personalInfo ? (
        <div>
          <p>Name: {`${personalInfo.name.first} ${personalInfo.name.last}`}</p>
          <p>Email: {personalInfo.email}</p>
          <img src={personalInfo.picture.large} alt="Profile" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Person;