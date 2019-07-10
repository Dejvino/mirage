// Copyright 2019 miruka
// This file is part of harmonyqml, licensed under LGPLv3.

import QtQuick 2.7

HAvatar {
    property string userId: ""

    readonly property var userInfo: userId ? users.find(userId) : ({})

    name:
        userInfo.displayName || userId.substring(1)  // no leading @

    imageUrl:
        userInfo.avatarUrl ?
        ("image://python/crop/" + userInfo.avatarUrl) : null

    toolTipImageUrl:
        userInfo.avatarUrl ?
        ("image://python/scale/" + userInfo.avatarUrl) : null

    //HImage {
        //id: status
        //anchors.right: parent.right
        //anchors.bottom: parent.bottom
        //source: "../../icons/status.svg"
        //sourceSize.width: 12
    //}
}
