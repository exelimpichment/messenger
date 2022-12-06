let isGroupMsgToggleOn = !true;

let getChats = (a, b) => {
  console.log(a + b);
};
let getGroupsChats = (a, b) => {
  console.log(a + b);
};

isGroupMsgToggleOn ? getChats(2, 2) : getGroupsChats(3, 3);
