goPage(1,15);
function goPage(pno, psize) {
    var itable = document.getElementById("table_result");//通过ID找到表格
    var num = itable.rows.length;//表格所有行数(所有记录数)
    var totalPage = 0;//总页数
    var pageSize = psize;//每页显示行数
    //总共分几页
    if (num / pageSize > parseInt(num / pageSize)) {
        totalPage = parseInt(num / pageSize) + 1;
    } else {
        totalPage = parseInt(num / pageSize);
    }
    var currentPage = pno;//当前页数
    var startRow = (currentPage - 1) * pageSize + 1;//开始显示的行  1
    var endRow = currentPage * pageSize;//结束显示的行   15
    endRow = (endRow > num) ? num : endRow;
    //遍历显示数据实现分页
    for (var i = 1; i < (num + 1=); i++) {
        var irow = itable.rows[i - 1];
        if (i >= startRow && i <= endRow) {
            irow.style.display = "block";
        } else {
            irow.style.display = "none";
        }
    }
    var tempStr = "";
    if (currentPage > 1) {
        tempStr += "<a href=\"#\" onClick=\"goPage(" + (currentPage - 1) + "," + psize + ")\"><上一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>"
        for (var j = 1; j <= totalPage; j++) {
            tempStr += "<a href=\"#\" onClick=\"goPage(" + j + "," + psize + ")\">" + j + "&nbsp;&nbsp;&nbsp;</a>"
        }
    } else {
        tempStr += "<上一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        for (var j = 1; j <= totalPage; j++) {
            tempStr += "<a href=\"#\" onClick=\"goPage(" + j + "," + psize + ")\">" + j + "&nbsp;&nbsp;&nbsp;</a>"
        }
    }
    if (currentPage < totalPage) {
        tempStr += "<a href=\"#\" onClick=\"goPage(" + (currentPage + 1) + "," + psize + ")\">下一页>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>";
        for (var j = 1; j <= totalPage; j++) {
        }
    } else {
        tempStr += "  下一页>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        for (var j = 1; j <= totalPage; j++) {
        }
    }
    document.getElementById("barcon").innerHTML = tempStr;
}
