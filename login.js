import React, { useState } from "react";

const LoginForm = ({ onLogin, onShowSignupForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 로그인 버튼을 클릭하면 호출되는 함수입니다.
    let authenticatedUser = users.find(function (user) {
      return user.username === username && user.password === password;
    });

    if (authenticatedUser) {
      alert("로그인 성공!");
      // 로그인 성공 후에 필요한 작업 수행
      onLogin(); // 부모 컴포넌트에서 로그인 성공 이벤트를 처리할 수 있도록 콜백 호출
    } else {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
      // 로그인 실패 후에 필요한 작업 수행
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
      <p>
        아직 회원이 아니신가요?{" "}
        <a href="#" onClick={onShowSignupForm}>
          회원가입
        </a>
      </p>
    </div>
  );
};

const SignupForm = ({ onSignup, onShowLoginForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // 회원가입 버튼을 클릭하면 호출되는 함수입니다.
    let existingUser = users.find(function (user) {
      return user.username === username;
    });

    if (existingUser) {
      alert("이미 같은 아이디가 존재합니다.");
      return;
    }

    let newUser = {
      username: username,
      password: password,
    };
    users.push(newUser);
    alert("회원가입이 완료되었습니다. 로그인해주세요.");

    // 회원가입 폼 숨기고 로그인 폼 보이기
    onSignup(); // 부모 컴포넌트에서 회원가입 완료 이벤트를 처리할 수 있도록 콜백 호출
  };

  return (
    <div style={{ display: "none" }}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>회원가입</button>
      <p>
        회원가입이 완료되었나요?
        <a href="#" onClick={onShowLoginForm}>
          로그인
        </a>
      </p>
    </div>
  );
};

const App = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleLogin = () => {
    // 로그인 성공 후에 필요한 작업 수행
    console.log("로그인 성공!");
  };

  const handleSignup = () => {
    // 회원가입 완료 후에 필요한 작업 수행
    setShowLoginForm(true); // 회원가입 폼을 숨기고 로그인 폼을 보여주도록 설정
  };

  const handleShowSignupForm = () => {
    // 회원가입 링크를 클릭하면 호출되는 함수입니다.
    setShowLoginForm(false); // 로그인 폼을 숨기고 회원가입 폼을 보여주도록 설정
  };

  return (
    <div>
      {showLoginForm ? (
        <LoginForm onLogin={handleLogin} onShowSignupForm={handleShowSignupForm} />
      ) : (
        <SignupForm onSignup={handleSignup} onShowLoginForm={() => setShowLoginForm(true)} />
      )}
    </div>
  );
};

export default App;
