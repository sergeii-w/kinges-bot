require('dotenv').config();
const {Bot, GrammyError, HttpError, Keyboard, InlineKeyboard} = require('grammy');

const bot = new Bot(process.env.BOT_API_KEY);

const {hydrate} = require('@grammyjs/hydrate');
bot.use(hydrate());
/******************************************************* */

let pMoney = 0;
let randomEnds = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
let upgrades = [0, 0];

const backKey = new InlineKeyboard().text('<-- Назад ', 'back');

function pRandomMoney() {
    let GetRandomMoney = Math.round(Math.random() * randomEnds.length);
    pMoney  = pMoney + GetRandomMoney;
};

bot.command('adminphp', async (ctx) => {
    if (ctx.from.id === 5539658133)
    {
        await ctx.reply(ctx);
    }
    else {
        await ctx.reply('Отказано в доступе.', {
        });
    };
    console.log(ctx.from)
    reply_markup: {remove_keyboard: true}
});

bot.api.setMyCommands([
    {
        command: 'start', 
        description: 'Меню',
    },
    {
        command: 'farm', 
        description: 'Заработать',
    },
    {
        command: 'balance', 
        description: 'Мой баланс',
    },
    {
        command: 'share', 
        description: 'Поделиться данными',
    },
    {
        command: 'inlinekeyboard', 
        description: 'тест',
    },
    {
        command: 'info', 
        description: 'Профиль',
    }
]);

bot.command(['start', 'help', 'cmd', 'commands'], async (ctx) => {
    const startKey = new Keyboard().text('/help').row().text('/farm').row().text('/adminphp').resized().oneTime()
    await ctx.reply('Добро пожаловать! Выберите команду:', {
        reply_markup: startKey
    })
});
bot.command('farm', async (ctx) => {
    pRandomMoney();
    await ctx.reply('Вы подняли немного денег! \nВаш новый баланс: ' + pMoney);
});
bot.command('info', async (ctx) => {
    const upgradeKey = new InlineKeyboard()
    .text('Улучшить армию', 'uArmy')
    .text('Улучшить замок', 'uCastle')
    .row().text('Заработать деньги', 'uMoney');
    await ctx.reply('Баланс: ' + pMoney + '\nУровень армии: ' + upgrades[0] + '\nУровень замка: ' + upgrades[1], {
        reply_markup: upgradeKey
    })

});
bot.command('balance', async (ctx) => {
    await ctx.reply('Ваш баланс: ' + pMoney);
});
bot.command('share', async (ctx) => {
    const shareKey = new Keyboard().requestLocation('Геолокация').row().requestContact('Номер телефона').row().requestPoll('Опрос').placeholder('Укажи данные...').resized()
    await ctx.reply('Чем хотите поделиться?', {
        reply_markup: shareKey
    })
});
bot.command('inlinekeyboard', async (ctx) => {
    const inlineKey = new InlineKeyboard()
    .text('1', 'button1')
    .text('2', 'button2')
    .text('3', 'button3');
    await ctx.reply('Цифра', {
        reply_markup: inlineKey
    })
});

// bot.callbackQuery(['button1', 'button2', 'button3'], async (ctx) => {
//     await ctx.answerCallbackQuery('...');

//     await ctx.reply('Вы выбрали цифру!')
// });


// reply_markup: {remove_keyboard: false}

// bot.command('balance', async (ctx) => {
//     await ctx.reply(pMoney);
// });
// bot.command('adminphp', async (ctx) => {
//     if (ctx.from.id === 5539658133)
//     {
//         await ctx.reply(ctx);
//     }
//     else {
//         await ctx.reply('Отказано в доступе.', {
//         });
//     };
//     console.log(ctx.from)
// });

bot.callbackQuery(['button1', 'button2', 'button3'], async (ctx) => {
    await ctx.answerCallbackQuery('...');
    await ctx.reply(`Вы нажали кнопку ${ctx.callbackQuery.data}`)
});
bot.callbackQuery(['uArmy'], async (ctx) => { 
    if (pMoney >= 10 && upgrades[0] === 0) 
    {
        upgrades[0] = 1;
        await ctx.callbackQuery.message.editText('✔ Улучшено! \nПотрачено 10 монет.', {
            reply_markup: backKey
        })
        pMoney -= 10;
        return false;
    } 
    else if (upgrades[0] === 0 && pMoney < 10) await ctx.callbackQuery.message.editText('❌ Провал! \nУлучшение стоит 10 монет.', {
        reply_markup: backKey
    })
    // else if (upgrades[0] != 0 && pMoney >= 10) await ctx.reply('❌ Провал! \nУ вас уже есть это улучшение!');
    /************************** */
    if (pMoney >= 30 && upgrades[0] === 1) 
    {
        upgrades[0] = 2;
        await ctx.callbackQuery.message.editText('✔ Улучшено! \nПотрачено 30 монет.', {
            reply_markup: backKey
        })
        pMoney -= 30;
        return false;
    } 
    else if (upgrades[0] === 1 && pMoney < 30) await ctx.callbackQuery.message.editText('❌ Провал! \nУлучшение стоит 30 монет.', {
        reply_markup: backKey
    })
    // else if (upgrades[0] != 0 && pMoney >= 30) await ctx.reply('❌ Провал! \nУ вас уже есть это улучшение!')
    /************************** */
    if (pMoney >= 60 && upgrades[0] === 2) 
    {
        upgrades[0] = 3;
        await ctx.callbackQuery.message.editText('✔ Улучшено! \nПотрачено 60 монет.', {
            reply_markup: backKey
        })
        pMoney -= 60;
        return false;
    } 
    else if (upgrades[0] === 2 && pMoney < 60) await ctx.callbackQuery.message.editText('❌ Провал! \nУлучшение стоит 60 монет.', {
        reply_markup: backKey
    })
    // else if (upgrades[0] != 0 && pMoney >= 60) await ctx.reply('❌ Провал! \nУ вас уже есть это улучшение!')
    /************************** */
    if (pMoney >= 90 && upgrades[0] === 3) 
    {
        upgrades[0] = 4;
        await ctx.callbackQuery.message.editText('✔ Улучшено! \nПотрачено 90 монет.', {
            reply_markup: backKey
        })
        pMoney -= 90;
        return false;
    } 
    else if (upgrades[0] === 3 && pMoney < 90) await ctx.callbackQuery.message.editText('❌ Провал! \nУлучшение стоит 90 монет.', {
        reply_markup: backKey
    })
    // else if (upgrades[0] != 0 && pMoney >= 90) await ctx.reply('❌ Провал! \nУ вас уже есть это улучшение!')
    /************************** */
    if (pMoney >= 120 && upgrades[0] === 4) 
    {
        upgrades[0] = 5
        await ctx.callbackQuery.message.editText('✔ Улучшено! \nПотрачено 120 монет.', {
            reply_markup: backKey
        })
        pMoney -= 120;
        return false;
    } 
    else if (upgrades[0] === 4 && pMoney < 120) await ctx.callbackQuery.message.editText('❌ Провал! \nУлучшение стоит 120 монет.', {
        reply_markup: backKey
    })
    // else if (upgrades[0] != 0 && pMoney >= 120) await ctx.reply('❌ Провал! \nУ вас уже есть это улучшение!')
});
bot.callbackQuery(['uCastle'], async (ctx) => { 
    if (pMoney >= 20 && upgrades[1] === 0) 
    {
        upgrades[1] = 1;
        await ctx.callbackQuery.message.editText('✔ Улучшено! \nПотрачено 20 монет.', {
            reply_markup: backKey
        })
        pMoney -= 20;
        return false;
    } 
    else if (upgrades[1] === 0 && pMoney < 20) await ctx.callbackQuery.message.editText('❌ Провал! \nУлучшение стоит 20 монет.', {
        reply_markup: backKey
    })
    // else if (upgrades[0] != 0 && pMoney >= 20) await ctx.reply('❌ Провал! \nУ вас уже есть это улучшение!');
    /************************** */
    if (pMoney >= 50 && upgrades[1] === 1) 
    {
        upgrades[1] = 2;
        await ctx.callbackQuery.message.editText('✔ Улучшено! \nПотрачено 30 монет.', {
            reply_markup: backKey
        })
        pMoney -= 50;
        return false;
    } 
    else if (upgrades[0] === 1 && pMoney < 50) await ctx.callbackQuery.message.editText('❌ Провал! \nУлучшение стоит 50 монет.', {
        reply_markup: backKey
    })
    // else if (upgrades[0] != 0 && pMoney >= 50) await ctx.reply('❌ Провал! \nУ вас уже есть это улучшение!')
    /************************** */
    if (pMoney >= 70 && upgrades[1] === 2) 
    {
        upgrades[1] = 3;
        await ctx.callbackQuery.message.editText('✔ Улучшено! \nПотрачено 70 монет.', {
            reply_markup: backKey
        })
        pMoney -= 70;
        return false;
    } 
    else if (upgrades[1] === 2 && pMoney < 70) await ctx.callbackQuery.message.editText('❌ Провал! \nУлучшение стоит 70 монет.', {
        reply_markup: backKey
    })
    // else if (upgrades[0] != 0 && pMoney >= 70) await ctx.reply('❌ Провал! \nУ вас уже есть это улучшение!')
    /************************** */
    if (pMoney >= 90 && upgrades[1] === 3) 
    {
        upgrades[1] = 4;
        await ctx.callbackQuery.message.editText('✔ Улучшено! \nПотрачено 90 монет.', {
            reply_markup: backKey
        })
        pMoney -= 90;
        return false;
    } 
    else if (upgrades[1] === 3 && pMoney < 90) await ctx.callbackQuery.message.editText('❌ Провал! \nУлучшение стоит 90 монет.', {
        reply_markup: backKey
    })
    // else if (upgrades[0] != 0 && pMoney >= 90) await ctx.reply('❌ Провал! \nУ вас уже есть это улучшение!')
    /************************** */
    if (pMoney >= 110 && upgrades[1] === 4) 
    {
        upgrades[1] = 5
        await ctx.callbackQuery.message.editText('✔ Улучшено! \nПотрачено 110 монет.', {
            reply_markup: backKey
        })
        pMoney -= 110;
        return false;
    } 
    else if (upgrades[1] === 4 && pMoney < 110) await ctx.callbackQuery.message.editText('❌ Провал! \nУлучшение стоит 110 монет.', {
        reply_markup: backKey
    })
    // else if (upgrades[0] != 0 && pMoney >= 110) await ctx.reply('❌ Провал! \nУ вас уже есть это улучшение!')
});
bot.callbackQuery(['uMoney'], async (ctx) => {
    await ctx.callbackQuery.message.editText('Введите команду - /farm', {
        reply_markup: backKey
    })
})
bot.callbackQuery('back', async (ctx) => {
    const upgradeKey = new InlineKeyboard()
    .text('Улучшить армию', 'uArmy')
    .text('Улучшить замок', 'uCastle')
    .row().text('Заработать деньги', 'uMoney');
    await ctx.callbackQuery.message.editText('Баланс: ' + pMoney + '\nУровень армии: ' + upgrades[0] + '\nУровень замка: ' + upgrades[1], {
        reply_markup: upgradeKey
    })
})

bot.on([':contact', ':poll', ':location'], async (ctx) => {
    await ctx.reply('👏');
});
bot.on('message:photo', async (ctx) => {
    await ctx.reply('Ставлю класс вашей картинке!');
});
bot.on('message:text', async (ctx) => {
    await ctx.reply('Сообщение не распознано. Используйте команды.');
});
bot.on('message:voice', async (ctx) => {
    await ctx.reply('Жаль, что я не могу услышать эту запись. Плак-плак');
});
bot.on('message:file', async (ctx) => {
    await ctx.reply('Не скидывай мне трояны!');
});

/********************************************************************* */

bot.catch((err) => {
    const ctx = err.ctx;
    console.error('Error while handling update ${ctx.update.update_id}:');
    const e = err.error;

    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    }
    else if (e instanceof HttpError) {
        console.error("Could not contact Telgram:", e);
    }
    else {
        console.error("Unknown error:", e);
    }
                });
bot.start();

/********************************************************************* */
// let checkingAttack = 0;
// async function upgrade(ctx) {
//     if (pMoney >= 10 && upgrades[0] === 0) {
//         upgrades[0] = 1;
//         await ctx.reply('✔ Улучшено! \nПотрачено 10 монет.')
//     } 
//     /************************** */
//     if (pMoney >= 30 && upgrades[0] === 0) {
//         upgrades[0] = 2;
//         await ctx.reply('✔ Улучшено! \nПотрачено 10 монет.')
//     } 
//     else {
//         await ctx.reply('❌ Провал! \nУлучшение стоит 30 монет.')
//     };
//     /************************** */
//     if (pMoney >= 60 && upgrades[0] === 0) {
//         upgrades[0] = 3;
//         await ctx.reply('✔ Улучшено! \nПотрачено 10 монет.')
//     } 
//     else {
//         await ctx.reply('❌ Провал! \nУлучшение стоит 60 монет.')
//     };
//     /************************** */
//     if (pMoney >= 90 && upgrades[0] === 0) {
//         upgrades[0] = 4;
//         await ctx.reply('✔ Улучшено! \nПотрачено 10 монет.')
//     } 
//     else {
//         await ctx.reply('❌ Провал! \nУлучшение стоит 90 монет.')
//     };
//     /************************** */
//     if (pMoney >= 120 && upgrades[0] === 0) {
//         upgrades[0] = 5
//         await ctx.reply('✔ Улучшено! \nПотрачено 10 монет.')
//     } 
//     else {
//         await ctx.reply('❌ Провал! \nУлучшение стоит 120 монет.')
//     };
// }