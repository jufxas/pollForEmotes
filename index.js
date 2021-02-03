const allEmotes = [
    './emotes/AnimeFeet.png',
    './emotes/AnimeKekw.gif',
    './emotes/Hold_Up.png',
    './emotes/KarpPog.png',
    './emotes/LOL.png',
    './emotes/LUL.png',
    './emotes/SpitDown.gif',
    './emotes/SpitSide.gif',
    './emotes/SpitUp.gif',
    './emotes/SunburntTits.png',
    './emotes/THOGGERS.png',
    './emotes/Tuff.png',
    './emotes/Uzaki.gif',
    './emotes/bruh.png',
    './emotes/feelsbadman.png',
    './emotes/flooshed.png',
    './emotes/floshed.png',
    './emotes/flushed_lion.png',
    './emotes/foggers.png',
    './emotes/forehead.png',
    './emotes/gasp.png',
    './emotes/holdup.png',
    './emotes/jerrykek.png',
    './emotes/kek.png',
    './emotes/laughpog.png',
    './emotes/okchamp.png',
    './emotes/peepoeyes.png',
    './emotes/peepohappy.png',
    './emotes/peepolove.png',
    './emotes/pepecry.png',
    './emotes/pepega.png',
    './emotes/pepesweat.png',
    './emotes/pepesweat2.png',
    './emotes/pingpong.png',
    './emotes/poggers.png',
    './emotes/poggers2.png',
    './emotes/sadge.png',
    './emotes/suspepe.png',
    './emotes/thinkeyes.png',
    './emotes/thonk.png',
    './emotes/what.png',
    './emotes/why.png',
    './emotes/why~1.png',
    './emotes/yay.png'
]

const maxEmotes = 5;

$("h1").html(`Select your ${maxEmotes} favorite emotes and submit. The bottom 10 will be eliminated.`)

for (let emotes of allEmotes) {
    emoteName = emotes.split("./emotes/").join("")
    if (emoteName.includes(".png")) emoteName = emoteName.split(".png").join("");
    else if (emoteName.includes(".gif")) emoteName = emoteName.split(".gif").join("");
    $("div#emotes").append(`
        <input type="checkbox" id="emoticon" name="emoticon" emoteName = ${emoteName}>
        <label for="emoticon" id="emoticon">${emoteName}</label>
        <img src = ${emotes} width="50" height="50"><a id="notifyIfTryingToSelectMore${emoteName}"></a>
        <br>
        
    `)
}

$("input#emoticon").click(function () {
    $("a").html("")
    let howManyCheck = []
    $("input#emoticon").each(function () {
        howManyCheck.push(this.checked)
    })
    howManyCheck = howManyCheck.filter(x => Boolean(x)).length
    if (howManyCheck > maxEmotes) {
        let identifyingAttachment = $(this).attr("emoteName")
        $(this).prop("checked", false)
        $("a#notifyIfTryingToSelectMore" + identifyingAttachment).html(`Can't select more than ${maxEmotes}!`)
    }
})

$("button#submit").click(function () {
    $("a").html("")

    function sendEmail(username, formData) {
        if (!username.length > 0) username = "Anonymous Name " + Math.random() * 10010101010101
        Email.send({
                Host: "smtp.gmail.com",
                Username: "doublefrequencybusiness@gmail.com",
                Password: "mynameisbob",
                To: 'doublefrequencybusiness@gmail.com',
                From: "doublefrequencybusiness@gmail.com",
                Subject: `"${username}" has chosen their ${maxEmotes} favorite emotes!`,
                Body: "Emotes they selected: " + formData.join(" ")
            })
            .then(function (message) {
                // lol 
            });
    }
    let howManyCheck = []
    let whichSelected = []
    $("input#emoticon").each(function () {
        howManyCheck.push(this.checked)
        if (this.checked) {
            whichSelected.push($(this).attr("emoteName"))
        }
    })
    howManyCheck = howManyCheck.filter(x => Boolean(x)).length
    if (howManyCheck !== maxEmotes) {
        $("span#notifyNotEnoughEmotes").css("color", "red")
        $("span#notifyNotEnoughEmotes").html(`You haven't picked ${maxEmotes} emotes!`)
    } else {
        if (Cookies.get("2j3j902j0nkdfskjsknx9c0ik02k32komxkzmczk9*(*923j23r") === undefined) {
            let username = $("textarea#inputName").val()
            $("span#notifyNotEnoughEmotes").css("color", "green")
            sendEmail(username, whichSelected)
            Cookies.set("2j3j902j0nkdfskjsknx9c0ik02k32komxkzmczk9*(*923j23r", "md3i2mdo0SD()D9j3o2lladi2fom");
            $("span#notifyNotEnoughEmotes").html("Vote sucessfully sent.")
        } else {
            $("span#notifyNotEnoughEmotes").css("color", "red")
            $("span#notifyNotEnoughEmotes").html("You have already sent a form submission.")
        }
    }
})