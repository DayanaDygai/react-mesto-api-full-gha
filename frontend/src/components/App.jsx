import React from "react";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header/Header.jsx";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import api from "../utils/Api";
import * as authMesto from "../utils/authMesto.js";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);
  const [isTooltipStatus, setIsTooltipStatus] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (loggedIn) {
  //     api
  //       .getUserInfo()
  //       .then((res) => {
  //         setCurrentUser((prevState) => ({
  //           ...prevState,
  //           name: res.name,
  //           avatar: res.avatar,
  //           _id: res._id,
  //           about: res.about,
  //         }));
  //       })
  //       .catch((error) => console.log(`ошибка: ${error}`));
  //   }
  // }, [loggedIn]);

  // useEffect(() => {
  //   if (loggedIn) {
  //     api
  //     .getAllCards()
  //     .then((data) => {
  //       setCards(data);
  //     })
  //     .catch((error) => console.log(`ошибка: ${error}`));
  //   }
   
  // }, [loggedIn]);

  //функция проверки токена пользователя
  // const auth = async (token) => {
  //   return authMesto.getContent(token).then((res) => {
  //     if (res) {
  //       setLoggedIn(true);
  //       setCurrentUser({
  //         email: res.data.email,
  //         _id: res.data._id,
  //       });
  //     }
  //   }).catch((error) => console.log(`ошибка: ${error}`));
  // };


  useEffect(() => {
    const token = localStorage.getItem("userId");
    if (token) {
    api 
    .getUserInfo()
      .then(([currentUser, cards]) => {
        setCurrentUser(currentUser);
        setCards(cards);
      })
      .catch((error) => console.log(`ошибка: ${error}`));
  }}, [ loggedIn])
  //сохраняем токен в локальном хранилище
  useEffect(() => {
    const token = localStorage.getItem("userId");
    if (token) {
      authMesto
      .getContent()
      .then((res) => {
        setCurrentUser({
          email: res.email,
          _id: res._id,
        });
        setLoggedIn(true);
        navigate("/")
      })
      .catch((error) => {
        localStorage.removeItem("userId");
        console.log(error);
      })


    }
  }, [navigate]);

  // useEffect(() => {
  //   if (loggedIn) navigate("/");
  // }, [loggedIn, navigate]);

  //функция регистрации пользователя
  const onRegister = ({ password, email }) => {
    return authMesto
      .register(password, email)
      .then((res) => {
        setIsTooltipStatus("successfully");
        setIsTooltipOpened(true);
        navigate("/sign-in", { replace: true });
        return res;
      })
      .catch((error) => {
        console.log(`ошибка: ${error}`);
        setIsTooltipStatus("error");
        setIsTooltipOpened(true);
      })
      .finally(() => {
        setIsTooltipOpened(false);
        setTimeout(function () {
          setIsTooltipStatus("");
        }, 2000);
      });
  };

  //функция для входа пользователя
  const onLogin = ({ password, email }) => {
    return authMesto
      .authorize(password, email)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("token", res.token);
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.log(`ошибка: ${error}`);
        setIsTooltipOpened(true);
        setIsTooltipStatus("error");
      })
      .finally(() => {
        setIsTooltipOpened(false);
        setTimeout(function () {
          setIsTooltipStatus("");
        }, 2000);
      });
  };

  //функция для выхода пользователя из приложения
  const onSignOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/sign-in");
  };

  //функция для постановки лайка
  const handleCardLike = (card) => {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((error) => console.log(`ошибка: ${error}`));
  };

  //функция для удаления добавленной карточки
  const handleCardDelete = (card) => {
    api
      .delete(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => console.log(`ошибка: ${error}`));
  };

  //открытие попапа аватара
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  //открытия попапа редактирования профиля
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  //открытия попапа для добавления карточки
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  //открытия картинки карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //функция для изменения информации о пользователе
  const handleUpdateUser = ({ name, about }) => {
    api
      .setUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.log(`ошибка: ${error}`));
  };

  //функция для изменения аватара
  const handleUpdateAvatar = (avatar) => {
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.log(`ошибка: ${error}`));
  };

  //функция для добавления новой карточке
  const handleUpdateCard = (data) => {
    api
      .createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(`ошибка: ${error}`));
  };

  //функция закрытия попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsTooltipOpened(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userEmail={currentUser.email} onSignOut={onSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                ></Main>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={onRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
        </Routes>

        <Footer />
        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onUpdateCard={handleUpdateCard}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          isOpen={isTooltipOpened}
          onClose={closeAllPopups}
          isStatus={isTooltipStatus}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
