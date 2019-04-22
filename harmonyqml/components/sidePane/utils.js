.import "../chat/utils.js" as ChatJS


function getLastRoomEventText(roomId, accountId) {
    var eventsModel = Backend.models.roomEvents.get(roomId)

    for (var i = 0; i < eventsModel.count; i++) {
        var ev = eventsModel.get(i)

        if (! Backend.EventIsOurProfileChanged(ev, accountId)) {
            var found = true
            break
        }
    }

    if (! found) { return "" }

    var name = Backend.getUserDisplayName(ev.dict.sender, false).result()
    var undecryptable = ev.type === "OlmEvent" || ev.type === "MegolmEvent"

    if (undecryptable || ev.type.startsWith("RoomMessage")) {
        var color = ev.dict.sender === roomList.forUserId ?
                    "darkblue" : "purple"

        return "<font color='" +
               color +
               "'>" +
               name +
               ":</font> " +
               (undecryptable ?
                "<font color='darkred'>Undecryptable<font>" :
                ev.dict.body)
   } else {
       return "<font color='" +
              (undecryptable ? "darkred" : "#444") +
              "'>" +
              name +
              " " +
              ChatJS.getEventText(ev.type, ev.dict) +
              "</font>"
   }
}
