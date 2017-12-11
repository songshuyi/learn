var fs = require("fs");
var superagent = require('superagent')

let index = 0
let data

superagent.get('http://www.xxlang.top/api/api_zlliebiao.php?zid=0')
    .end(function (err,res) {
        if(err){
            console.log(err.message)
        }else{
            data = JSON.parse(res.text)
            getDetail()
        }
    })

function getDetail() {
    superagent.get('http://www.xxlang.top/api/api_neirong.php?zid=0&fzid='+data[index].fzid)
        .end(function (err,res) {
            if(err){
                console.log(err.message)
            }else{
                if(index < data.length) {
                    writeFile('./static/data/'+data[index].fzid+'.json',res.text)
                    index ++
                    getDetail()
                }
            }
        })
}

mkdirs('./static/data',function () {
    
})

function mkdirs(dirpath,_callback) {
    fs.exists( dirpath ,function(exists){
        if(!exists){
            fs.mkdir(dirpath,function(){
                _callback();
            });
        }else{
            _callback();
        }
    });
}

function writeFile(path,data) {
    fs.appendFile(path,data,function(err){
        if(err){
            console.log("文件写入失败")
        }else{
            console.log("文件追加成功");

        }
    })
}