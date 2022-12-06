import React, { useEffect, useState, useContext, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
// import { getFirestore, getDocs } from "firebase/firestore";
// dpdplfplsfp
import {
  doc,
  setDoc,
  updateDoc,
  getFirestore,
  getDocs,
  deleteDoc,
  addDoc,
} from 'firebase/firestore';
import {
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCGX6guk-FO2xKYJoJv18_7BttIwTPkPmc',
  authDomain: 'chatapp-d2ddf.firebaseapp.com',
  projectId: 'chatapp-d2ddf',
  storageBucket: 'chatapp-d2ddf.appspot.com',
  messagingSenderId: '458520544459',
  appId: '1:458520544459:web:5f0d1a06ca7019afbb074e',
  measurementId: 'G-EFHN9ZGHDH',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// ===============================
const userContext = React.createContext();

export const UserContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState('');
  const [searchedUser, setSearchedUser] = useState([]);
  const [openedConversations, setOpenedConversation] = useState([]);
  // ===========5========
  const [message, setMessage] = useState('');
  const [showChatSection, setShowChatSection] = useState(true);
  const [upperSectionChatUserInformation, setUpperSectionChatUserInformation] =
    useState('');
  const [activeChat, setActiveChat] = useState([]);
  // const [listenToUser, setListenToUser] = useState("");
  const [msgDocId, setMsgDocId] = useState('');
  // ===========10========
  const [isEmojiVisible, setIsEmojiVisible] = useState(false);
  const [isReplyWindowOpen, setIsReplyWindowOpen] = useState(false);
  const [replyWindowContent, setReplyWindowContent] = useState('');
  const [isForwardWindowOpen, setIsForwardWindowOpen] = useState(false);
  const [isEditSectionOpen, setEditSectionOpen] = useState(false);

  // ===========15========
  const [isSettingsWindowOpen, setIsSettingsWindowOpen] = useState(false);
  const [isGroupCreationSectionOpen, setIsGroupCreationSectionOpen] =
    useState(false);
  const [groupUsersArray, setGroupUsersArray] = useState('');
  const [widthSideSection, setWidthSideSection] = useState(0);
  const [createdGroupName, setCreatedGroupName] = useState('');
  // ===========20========
  const [activeGroups, setActiveGroups] = useState([]);
  const [isGroupMsgToggleOn, setIsGroupMsgToggleOn] = useState(false);
  const [serverPermitionSender, setServerPermitionSender] = useState(true);
  // ===========GIC=============

  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });
  const [showContextMenu, setShowContextMenu] = useState(false);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const activeChatLength = useRef(0);

  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    //  global mouse coordinates
    const handleWindowMouseMove = (event) => {
      setMouseCoord({
        x: event.pageX,
        y: event.pageY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  useEffect(() => {
    const { x: menuPositionX, y: menuPositionY } = globalCoords;
    const { x: mousePositionX, y: mousePositionY } = mouseCoord;

    const handleMouseMoveAwayFromContextMenu = () => {
      if (
        menuPositionY + 200 < mousePositionY ||
        menuPositionY - 90 > mousePositionY
      ) {
        setShowContextMenu(false);
        // setMsgDocId("");
      }
      if (
        menuPositionX + 200 < mousePositionX ||
        menuPositionX - 130 > mousePositionX
      ) {
        setShowContextMenu(false);
        // setMsgDocId("");
      }
    };

    if (showContextMenu) {
      window.addEventListener('mousemove', handleMouseMoveAwayFromContextMenu);
      return () =>
        window.removeEventListener(
          'mousemove',
          handleMouseMoveAwayFromContextMenu
        );
    }
  }, [globalCoords, mouseCoord, showContextMenu]);

  // ==============EMOJI LOGIC =================
  // handleEmoji("thumbsDown");
  const handleEmoji = async (type) => {
    if (upperSectionChatUserInformation.groups) {
      console.log('updating');
      const { docID } = upperSectionChatUserInformation;
      const emojiesRef = doc(
        db,
        `groups/${upperSectionChatUserInformation.docID}/conversation/${msgDocId.docID}`
      );

      let tempEmojiArray;

      switch (type) {
        case 'heart':
          tempEmojiArray = msgDocId.heart;
          if (msgDocId.heart.includes(currentUser.uid)) {
            tempEmojiArray = tempEmojiArray.filter(
              (item) => item !== currentUser.uid
            );
          } else {
            tempEmojiArray.push(currentUser.uid);
          }
          await updateDoc(emojiesRef, {
            [type]: tempEmojiArray,
          });
          break;
        // ==============================

        case 'fire':
          tempEmojiArray = msgDocId.fire;
          if (msgDocId.fire.includes(currentUser.uid)) {
            tempEmojiArray = tempEmojiArray.filter(
              (item) => item !== currentUser.uid
            );
          } else {
            tempEmojiArray.push(currentUser.uid);
          }
          await updateDoc(emojiesRef, {
            [type]: tempEmojiArray,
          });
          break;

        // ==============================
        case 'thumbsUp':
          tempEmojiArray = msgDocId.thumbsUp;
          if (msgDocId.thumbsUp.includes(currentUser.uid)) {
            tempEmojiArray = tempEmojiArray.filter(
              (item) => item !== currentUser.uid
            );
          } else {
            tempEmojiArray.push(currentUser.uid);
          }
          await updateDoc(emojiesRef, {
            [type]: tempEmojiArray,
          });
          break;
        // ==============================

        case 'thumbsDown':
          tempEmojiArray = msgDocId.thumbsDown;
          if (msgDocId.thumbsDown.includes(currentUser.uid)) {
            tempEmojiArray = tempEmojiArray.filter(
              (item) => item !== currentUser.uid
            );
          } else {
            tempEmojiArray.push(currentUser.uid);
          }
          await updateDoc(emojiesRef, {
            [type]: tempEmojiArray,
          });
          break;
        // ==============================
        default:
          console.log('other');
          break;
      }
    } else {
      const emojiesRef = doc(
        db,
        `privatMSGs/${upperSectionChatUserInformation.docID}/privatConversation/${msgDocId.docID}`
      );

      let tempEmjiArray;

      switch (type) {
        case 'heart':
          tempEmjiArray = msgDocId.heart;
          if (msgDocId.heart.includes(currentUser.uid)) {
            tempEmjiArray = tempEmjiArray.filter(
              (item) => item !== currentUser.uid
            );
          } else {
            tempEmjiArray.push(currentUser.uid);
          }
          await updateDoc(emojiesRef, {
            [type]: tempEmjiArray,
          });
          break;
        // ==============================

        case 'fire':
          tempEmjiArray = msgDocId.fire;
          if (msgDocId.fire.includes(currentUser.uid)) {
            tempEmjiArray = tempEmjiArray.filter(
              (item) => item !== currentUser.uid
            );
          } else {
            tempEmjiArray.push(currentUser.uid);
          }
          await updateDoc(emojiesRef, {
            [type]: tempEmjiArray,
          });
          break;

        // ==============================
        case 'thumbsUp':
          tempEmjiArray = msgDocId.thumbsUp;
          if (msgDocId.thumbsUp.includes(currentUser.uid)) {
            tempEmjiArray = tempEmjiArray.filter(
              (item) => item !== currentUser.uid
            );
          } else {
            tempEmjiArray.push(currentUser.uid);
          }
          await updateDoc(emojiesRef, {
            [type]: tempEmjiArray,
          });
          break;
        // ==============================

        case 'thumbsDown':
          tempEmjiArray = msgDocId.thumbsDown;
          if (msgDocId.thumbsDown.includes(currentUser.uid)) {
            tempEmjiArray = tempEmjiArray.filter(
              (item) => item !== currentUser.uid
            );
          } else {
            tempEmjiArray.push(currentUser.uid);
          }
          await updateDoc(emojiesRef, {
            [type]: tempEmjiArray,
          });
          break;
        // ==============================
        default:
          console.log('other');
          break;
      }
    }
  };
  // ===========CONTEXT MENU BUTTONS=============
  const handleGear = () => {
    setIsSettingsWindowOpen(!isSettingsWindowOpen);
    setIsGroupCreationSectionOpen(false);
    setGroupUsersArray('');
  };
  // =========== REPLY =============

  const handleReply = async (uid, docID, displayName, msg, photoURL) => {
    setReplyWindowContent({ uid, docID, displayName, msg, photoURL });
    setIsReplyWindowOpen(true);
  };

  const handleReplyCross = () => {
    console.log('click on the cross');
    setIsReplyWindowOpen(false);
  };

  // =========== REPLY =============

  // =========== FORWARD =============
  const handleForward = () => {
    console.log('forward click!');
    setIsForwardWindowOpen(true);
    setIsReplyWindowOpen(false);
  };

  const handleForwardCross = () => {
    setIsForwardWindowOpen(false);
  };
  // =========== click =============

  const handleForwardWindowClick = async (
    displayName,
    photoURL,
    uid,
    // id,
    groups,
    docID
  ) => {
    console.log(
      displayName,
      photoURL,
      uid,
      // id,
      groups,
      docID
    );
    setIsForwardWindowOpen(false);

    if (groups) {
      console.log('+isGroupMsgToggleOn');
      const docRef = await addDoc(
        collection(db, 'groups', `${docID}`, 'conversation'),
        {
          message,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          uid: currentUser.uid,
          createdAt: serverTimestamp(),
          read: false,
          fire: [],
          heart: [],
          thumbsDown: [],
          thumbsUp: [],
          // reply: isReplyWindowOpen,
          forward: true,
          forwardText: msgDocId.msg,
          forwardedFrom: msgDocId.displayName,
          // replyText: null,
          // repliedMsgUser: null,
          // userWeRepliedFrom: msgDocId.displayName,
          // groupName: groupName,
        }
      );
    } else {
      console.log('!!!!isGroupMsgToggleOn');
      const docRef = await addDoc(
        collection(db, 'privatMSGs', `${docID}`, 'privatConversation'),
        {
          message,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          uid: currentUser.uid,
          createdAt: serverTimestamp(),
          read: false,
          fire: [],
          heart: [],
          thumbsDown: [],
          thumbsUp: [],
          // reply: isReplyWindowOpen,
          forward: true,
          forwardText: msgDocId.msg,
          forwardedFrom: msgDocId.displayName,

          // replyText: null,
          // repliedMsgUser: null,
          // userWeRepliedFrom: msgDocId.displayName,
          // groupName: groupName,
        }
      );
    }
    // console.log("upper section updated");

    // let tempID = groups ? "docID" : "id";

    groups ? setIsGroupMsgToggleOn(true) : setIsGroupMsgToggleOn(false);

    setUpperSectionChatUserInformation({
      displayName,
      photoURL,
      groups,
      docID,
      uid,
    });
    console.log('upper section updated2');
  };
  // =========== FORWARD =============
  // =========== EDIT =============
  const handleEdit = () => {
    console.log('edit click!');
    setEditSectionOpen(true);
    setMessage(msgDocId.msg);
    setIsReplyWindowOpen(false);
    setIsForwardWindowOpen(false);
  };

  const handleEditCross = () => {
    setEditSectionOpen(false);
    console.log('close click');
    setMessage('');
  };
  // =========== EDIT =============

  // =========== DELETE =============
  const handleDelete = async (uid, docID) => {
    if (upperSectionChatUserInformation.groups) {
      const deletedMsgRef = doc(
        db,
        `groups/${upperSectionChatUserInformation.docID}/conversation/${msgDocId.docID}`
      );
      await deleteDoc(deletedMsgRef);
    } else {
      const deletedMsgRef = doc(
        db,
        `privatMSGs/${upperSectionChatUserInformation.docID}/privatConversation/${msgDocId.docID}`
      );
      await deleteDoc(deletedMsgRef);
    }
  };

  // =========== DELETE =============

  // ===========CONTEXT MENU LOGIC=============

  // ===========SWITHES=============
  const [usersMsg, setUserMsg] = useState(true);
  const [searchUserMsg, setSearchUserMsg] = useState(false);
  const [groupSection, setGroupSection] = useState(false);
  const [searchGroup, setSearchGroup] = useState(false);

  const handleSetUserMsg = () => {
    setIsGroupCreationSectionOpen(false);
    setGroupUsersArray('');
    setUserMsg(true);
    setSearchUserMsg(false);
    setGroupSection(false);
    setSearchGroup(false);
    setIsSettingsWindowOpen(false);
  };
  const handleSetSearchUserMsg = () => {
    setIsGroupCreationSectionOpen(false);
    setGroupUsersArray('');
    setUserMsg(false);
    setSearchUserMsg(true);
    setGroupSection(false);
    setSearchGroup(false);
    setIsSettingsWindowOpen(false);
  };
  const handleSetGroupSection = () => {
    setIsGroupCreationSectionOpen(false);
    setGroupUsersArray('');
    setUserMsg(false);
    setSearchUserMsg(false);
    setGroupSection(true);
    setSearchGroup(false);
    setIsSettingsWindowOpen(false);
  };
  const handleSetSearchGroup = () => {
    setUserMsg(false);
    setSearchUserMsg(false);
    setGroupSection(false);
    setSearchGroup(true);
    setIsSettingsWindowOpen(false);
  };

  // ===========-----------=============

  // ===========-----------=============

  const handleSignIn = () => {
    signInWithRedirect(auth, provider).catch((error) => {
      console.log(error);
    });
  };
  // ============================

  const selectConversation = (displayName, email, photoURL, uid, docID) => {
    // console.log(displayName, email, photoURL, uid);
    setUpperSectionChatUserInformation({
      displayName,
      email,
      photoURL,
      uid,
      docID,
    });
    // setListenToUser(currentUser.uid);
    setIsSettingsWindowOpen(false);
    setIsGroupMsgToggleOn(false);
  };

  const handleSent = async () => {
    if (isGroupMsgToggleOn && !isEditSectionOpen) {
      let repliedMSG = isReplyWindowOpen ? replyWindowContent.msg : null;
      let repliedMsgUser = isReplyWindowOpen
        ? replyWindowContent.displayName
        : null;
      console.log('sent here');
      const docRef = await addDoc(
        collection(
          db,
          'groups',
          `${upperSectionChatUserInformation.docID}`,
          'conversation'
        ),
        {
          message,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          uid: currentUser.uid,
          createdAt: serverTimestamp(),
          read: false,

          fire: [],
          heart: [],
          thumbsDown: [],
          thumbsUp: [],
          reply: isReplyWindowOpen,
          forward: false,
          replyText: repliedMSG,
          repliedMsgUser,
        }
      );
    }

    if (isEditSectionOpen && upperSectionChatUserInformation.groups) {
      const editedMSGRef = doc(
        db,
        `groups/${upperSectionChatUserInformation.docID}/conversation/${msgDocId.docID}`
      );

      await updateDoc(editedMSGRef, {
        message,
      });

      setMessage('');
      setEditSectionOpen(false);
    }

    if (isEditSectionOpen) {
      const editedMSGRef = doc(
        db,
        `privatMSGs/${upperSectionChatUserInformation.docID}/privatConversation/${msgDocId.docID}`
      );
      await updateDoc(editedMSGRef, {
        message,
      });

      setMessage('');
      setEditSectionOpen(false);
    } else {
      const { displayName, email, photoURL, uid } =
        upperSectionChatUserInformation;

      const sendToServer = async () => {
        let repliedMSG = isReplyWindowOpen ? replyWindowContent.msg : null;
        let repliedMsgUser = isReplyWindowOpen
          ? replyWindowContent.displayName
          : null;

        // console.log(repliedMSG);
        // console.log(repliedMsgUser);

        const docRef = await addDoc(
          collection(
            db,
            'privatMSGs',
            `${upperSectionChatUserInformation.docID}`,
            'privatConversation'
          ),
          {
            message,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
            createdAt: serverTimestamp(),
            read: false,
            fire: [],
            heart: [],
            thumbsDown: [],
            thumbsUp: [],
            reply: isReplyWindowOpen,
            forward: false,
            replyText: repliedMSG,
            repliedMsgUser,
          }
        );
      };

      !isGroupMsgToggleOn && sendToServer();

      setMessage('');
      setIsReplyWindowOpen(false);
    }
  };

  // ============================
  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.log(error);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const getData = async () => {
      const userRef = collection(db, 'users');

      const q = query(userRef, where('email', '==', `${search}`));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setSearchedUser((searchedUser) => [...searchedUser, doc.data()]);
      });
    };
    getData();
    setSearch('');
  };

  const handleAddUser = (displayName, email, photoURL, uid) => {
    setUpperSectionChatUserInformation({ displayName, email, photoURL, uid });
    setOpenedConversation([]);
    setUserMsg(true);
    setSearchUserMsg(false);
    setGroupSection(false);
    setSearchGroup(false);
    setSearchedUser([]);
    // const usersRef = collection(db, "privatMSGs");

    const addUserToContacts = async () => {
      console.log('adding');
      console.log(currentUser.uid);
      console.log(uid);

      const privatMSGsRef = await addDoc(collection(db, 'privatMSGs'), {
        chatMembers: [uid, currentUser.uid],
        [currentUser.uid]: {
          photoURL: photoURL,
          email: email,
          displayName: displayName,
          uid: uid,
        },
        [uid]: {
          photoURL: currentUser.photoURL,
          email: currentUser.email,
          displayName: currentUser.displayName,
          uid: currentUser.uid,
        },
      });
    };

    addUserToContacts();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        setCurrentUser({ displayName, email, photoURL, uid });
        setIsLoggedIn(true);

        const addUserTODB = async () => {
          await setDoc(doc(db, 'users', `${uid}`), {
            displayName,
            email,
            photoURL,
            uid,
          });
        };

        const addUserToCorrespondence = async () => {
          await setDoc(doc(db, 'correspondence', `${uid}`), {
            uid,
            displayName,
          });
        };

        addUserTODB();
        addUserToCorrespondence();
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    // const { uid: uidCurrenUser } = currentUser;
    // let userRef = `users/${uidCurrenUser}/conversations`;
    const q = query(
      collection(db, 'privatMSGs'),
      where('chatMembers', 'array-contains', `${currentUser.uid}`)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const conversations = [];
      querySnapshot.forEach((doc) => {
        let docID = doc.id;
        conversations.push({ ...doc.data(), docID });
      });

      setOpenedConversation(conversations);
    });
  }, [currentUser]);

  // =========GETTING INFORMATION FOR OUR CHAT ============

  useEffect(() => {
    const getChats = () => {
      // const { displayName, email, photoURL, uid, tempId } =
      //   upperSectionChatUserInformation;
      const q = query(
        collection(
          db,
          `privatMSGs/${upperSectionChatUserInformation.docID}/privatConversation/`
        ),
        orderBy('createdAt')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const chats = [];
        querySnapshot.forEach((doc) => {
          let tempStorage = doc.data();
          let docID = doc.id;
          // console.log(tempStorage);
          chats.push({ ...tempStorage, docID });
        });
        setActiveChat(chats);
      });
    };
    // ============================
    const getGroupsChats = () => {
      const { displayName, email, photoURL, uid } =
        upperSectionChatUserInformation;
      const q = query(
        collection(
          db,
          `groups/${upperSectionChatUserInformation.docID}/conversation`
        ),
        orderBy('createdAt')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const GroupChats = [];
        querySnapshot.forEach((doc) => {
          let tempStorage = doc.data();
          let docID = doc.id;
          // console.log(tempStorage);
          GroupChats.push({ ...tempStorage, docID });
        });
        setActiveChat(GroupChats);
      });
    };
    !isGroupMsgToggleOn ? getChats() : getGroupsChats();
  }, [upperSectionChatUserInformation, isGroupMsgToggleOn]);
  // });

  // =======================================
  // ==============GROUP_SECTION====================

  const handleGroupUsrAdd = (displayName, email, photoURL, uid) => {
    setIsGroupCreationSectionOpen(true);

    setIsSettingsWindowOpen(false);

    if (groupUsersArray.includes(uid)) {
      setGroupUsersArray(groupUsersArray);
    } else {
      setGroupUsersArray([...groupUsersArray, uid]);
    }

    if (groupUsersArray.includes(uid)) {
      console.log('now it has, but you have to remove it!');
      let filtredArr = groupUsersArray.filter((item) => {
        return item !== uid;
      });
      setGroupUsersArray(filtredArr);
      console.log(filtredArr);
    }
  };

  useEffect(() => {
    if (groupUsersArray.length < 1) {
      setIsGroupCreationSectionOpen(false);
    }
  }, [groupUsersArray]);
  // =======================================

  const handleGroupCreationCross = () => {
    setGroupUsersArray('');
    setIsGroupCreationSectionOpen(false);
  };

  const handleCreateGroupButton = async () => {
    groupUsersArray.push(currentUser.uid);
    console.log(groupUsersArray);
    const docRef = await addDoc(collection(db, 'groups'), {
      displayName: createdGroupName || 'unnamed group',
      photoURL:
        'https://pics.freeicons.io/uploads/icons/png/17360443101582799499-512.png',
      members: groupUsersArray,
      groups: true,
    });
    setIsGroupCreationSectionOpen(false);
    setGroupUsersArray('');
    setUserMsg(false);
    setSearchUserMsg(false);
    setGroupSection(true);
    setSearchGroup(false);
    console.log('Document written with ID: ', docRef.id);
    setCreatedGroupName('');
  };

  useEffect(() => {
    const q = query(
      collection(db, 'groups'),
      where('members', 'array-contains', `${currentUser.uid}`)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const groups = [];
      querySnapshot.forEach((doc) => {
        let docID = doc.id;
        groups.push({ ...doc.data(), docID });
      });
      setActiveGroups(groups);
    });
  }, [currentUser]);

  const handleGroupClick = (displayName, photoURL, docID, groups) => {
    setIsGroupMsgToggleOn(true);

    setUpperSectionChatUserInformation({
      displayName,
      photoURL,
      groups,
      docID,
    });
  };
  // =======================================

  const updateRead = async (docID) => {
    console.log('updating');
    const editedMSGRef = doc(
      db,
      `privatMSGs/${upperSectionChatUserInformation.docID}/privatConversation/${docID}`
    );
    await updateDoc(editedMSGRef, {
      read: true,
    });
  };

  return (
    <userContext.Provider
      value={{
        handleSignIn,
        handleSignOut,
        currentUser,
        isLoggedIn,
        handleSubmit,
        setSearch,
        search,
        handleSetUserMsg,
        handleSetSearchUserMsg,
        handleSetGroupSection,
        handleSetSearchGroup,
        usersMsg,
        searchUserMsg,
        groupSection,
        searchGroup,
        searchedUser,
        handleAddUser,
        openedConversations,
        setMessage,
        message,
        handleSent,
        showChatSection,
        upperSectionChatUserInformation,
        selectConversation,
        activeChat,
        globalCoords,
        showContextMenu,
        setShowContextMenu,
        setGlobalCoords,
        setWidth,
        setHeight,
        height,
        width,
        handleEmoji,
        setMsgDocId,
        msgDocId,
        isEmojiVisible,
        setIsEmojiVisible,
        handleDelete,
        handleReply,
        replyWindowContent,
        isReplyWindowOpen,
        handleReplyCross,
        handleForward,
        handleEdit,
        isForwardWindowOpen,
        handleForwardCross,
        handleForwardWindowClick,
        setEditSectionOpen,
        handleEditCross,
        isEditSectionOpen,
        // activeChat,
        isSettingsWindowOpen,
        setIsSettingsWindowOpen,
        handleGear,
        isGroupCreationSectionOpen,
        setIsGroupCreationSectionOpen,
        handleGroupUsrAdd,
        handleGroupCreationCross,
        widthSideSection,
        setWidthSideSection,
        groupUsersArray,
        handleCreateGroupButton,
        createdGroupName,
        setCreatedGroupName,
        activeGroups,
        handleGroupClick,
        isGroupMsgToggleOn,
        updateRead,
        activeChatLength,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};
