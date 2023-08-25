"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ignore_for_file: public_member_api_docs, sort_constructors_first
require("dart:developer");
require("package:flutter/material.dart");
require("package:client/models/user_model.dart");
class UserProvider extends ChangeNotifier {
    get user() { }
}
void setUser(User, user);
{
    _user = user;
    log(_user.username);
    notifyListeners();
}
// UserProvider copyWith({
//   bool? isOnline,
// }) {
//   return UserProvider(
//     _user: _user ?? this._user,
//   );
// }
void setIsOnline(bool, isOnline);
{
    _user.isOnline = isOnline;
    log(_user.isOnline.toString());
    notifyListeners();
}
