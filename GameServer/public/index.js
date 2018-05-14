function createUserElement(name, score) {
    const ele = $(`
       <div class="player animated">
            <h1 class="score">${score}</h1>
            <div class="playerName">${name}</div>
       </div> 
    `);

    ele.addClass('fadeInDown');

    return ele;
}

function requestUser(callback) {
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
            callback(data.results[0]);
        }
    });
}

$(function () {
    let counter = 0;
    setInterval(() => {
        if (counter > 12) {
            $('#players').html("");

            counter = 0;
        }

        requestUser(function (user) {
            const score = Math.ceil(Math.random() * 1000);
            $('#players').append(createUserElement(user.login.username, score));
        });
        counter++;
    }, 5000);
});