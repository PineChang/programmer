/**
 * Created with WebStorm 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/8/2
 * Time：
 * Description：
 */


function TranslationRecord() {
}


TranslationRecord.addTranslateRecord = function (word, translate) {
    console.log('word:' + word + "<>translate:" + translate);
    fetch(Utils.LEANCLOUD_SERVCE + 'translate/addTranslateRecord', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({word: word, translate: translate})
    }).then(function (result) {
        console.log('result->' + result);
    }).catch(function (error) {
        console.log('error->' + error);
    });
};


module.exports = TranslationRecord;