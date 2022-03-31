　Date.prototype.format = function() {
    　　　　　var s = '';
    　　　　　var mouth = (this.getMonth() + 1)>=10?(this.getMonth() + 1):('0'+(this.getMonth() + 1));
    　　　　　var day = this.getDate()>=10?this.getDate():('0'+this.getDate());
    　　　　　s += this.getFullYear() + '-'; // 获取年份。
    　　　　　s += mouth + "-"; // 获取月份。
    　　　　　s += day; // 获取日。
    　　　　　return s; // 返回 “年-月-日”格式
    　　};
    
    　　function getDateInfo(begin, end) {
    　　　　var arr = [];
    　　　　var str_b = begin.split("-");
    　　　　var str_e = end.split("-");
    　　　　var date_b = new Date();
    　　　　date_b.setUTCFullYear(str_b[0], str_b[1] - 1, str_b[2]);
    　　　　var date_e = new Date();
    　　　　date_e.setUTCFullYear(str_e[0], str_e[1] - 1, str_e[2]);
    　　　　var unixDb = date_b.getTime() - 24 * 60 * 60 * 1000;
    　　　　var unixDe = date_e.getTime() - 24 * 60 * 60 * 1000;
    　　　　for (var j = unixDb; j <= unixDe;) { 
    　　　　　　j = j + 24 * 60 * 60 * 1000;
    　　　　　　arr.push((new Date(parseInt(j))).format());
    　　　　}
    　　　　return arr;
    }
    
    