import React from "react";

export const useLocalStorage = () => {
  //-----------------------------------------get user data from local storage----------------------------------
  function getFromLocalStorage(key) {
    // roleCheck(key);
    return localStorage.getItem(key);
  }

  //-----------------------------------------save user data to local storage----------------------------------
  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  //-----------------------------------------delete user data from local storage----------------------------------
  function deleteFromLocalStorage(key) {
    localStorage.removeItem(key);
  }

  //------------------------------------------clear all data from local storage----------------------------------
  function clearLocalStorage() {
    localStorage.clear();
  }

  return {
    getFromLocalStorage,
    saveToLocalStorage,
    deleteFromLocalStorage,
    clearLocalStorage,
  };
};
