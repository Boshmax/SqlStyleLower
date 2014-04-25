//version 0.2

function Start() {
	var path = UltraEdit.activeDocument.path;
	var re = /.*\\.*\.sql/gi;

	if (re.test(path)) {
		UltraEdit.activeDocument.toggleBookmark();
		UltraEdit.activeDocument.gotoBookmark(-1);
		UltraEdit.activeDocument.top();
		UltraEdit.activeDocument.key("UP ARROW");
		formating();
		UltraEdit.activeDocument.gotoBookmark(-1);
		UltraEdit.activeDocument.toggleBookmark();
	}
	else {
		//UltraEdit.messageBox("не распознан путь");
	}
	if (path !== "D:\\Git\\SqlStyleLower\\SqlStyleLower.js")
	{
		UltraEdit.save();

	}
}


function formating(){
	//удаление всех пробелов и табов справа
	UltraEdit.activeDocument.trimTrailingSpaces();

	UltraEdit.perlReOn()
	UltraEdit.activeDocument.findReplace.matchCase=true;
	UltraEdit.activeDocument.findReplace.matchWord=false;
	UltraEdit.activeDocument.findReplace.regExp=true;
	UltraEdit.activeDocument.findReplace.searchAscii=false;
	UltraEdit.activeDocument.findReplace.searchDown=true;
	UltraEdit.activeDocument.findReplace.replaceAll=true;
	if (typeof(UltraEdit.activeDocument.findReplace.mode) != "undefined")
	{
	   UltraEdit.activeDocument.findReplace.mode=0;
	}
	if (typeof(UltraEdit.activeDocument.findReplace.searchInColumn) != "undefined")
	{
	   UltraEdit.activeDocument.findReplace.searchInColumn=false;
	}
	UltraEdit.activeDocument.top();

	//type 
	ReplaceLower("BIGINT");
	ReplaceLower("BINARY");
	ReplaceLower("BIT");
	ReplaceLower("CHAR");
	ReplaceLower("DATE");
	ReplaceLower("DATETIME");
	ReplaceLower("FLOAT");
	ReplaceLower("INT");
	ReplaceLower("MONEY");
	ReplaceLower("NUMERIC");
	ReplaceLower("REAL");
	ReplaceLower("SMALLDATETIME");
	ReplaceLower("SMALLINT");
	ReplaceLower("TABLE");
	ReplaceLower("TIME");
	ReplaceLower("TINYINT");
	ReplaceLower("TYPE");
	ReplaceLower("UNIQUEIDENTIFIER");
	ReplaceLower("VARBINARY");
	ReplaceLower("VARCHAR");
	ReplaceLower("XML");

	ReplaceLower("ALTER");
	ReplaceLower("CREATE");
	ReplaceLower("BEGIN");
	ReplaceLower("BREAK");
	ReplaceLower("CATCH");
	ReplaceLower("COMMIT");
	ReplaceLower("DECLARE");
	ReplaceLower("DELETE");
	ReplaceLower("END");
	ReplaceLower("EXEC");
	ReplaceLower("FUNCTION");
	ReplaceLower("GO");
	ReplaceLower("GRANT");
	ReplaceLower("IF");
	ReplaceLower("INSERT");
	ReplaceLower("INTO");
	ReplaceLower("PROCEDURE");
	ReplaceLower("RAISERROR");
	ReplaceLower("RETURN");
	ReplaceLower("RETURNS");
	ReplaceLower("ROLLBACK");
	ReplaceLower("SAVE");
	ReplaceLower("TRAN");
	ReplaceLower("TRIGGER");
	ReplaceLower("TRY");
	ReplaceLower("VIEW");
	ReplaceLower("WHILE");
	ReplaceLower("WITH");
	ReplaceLower("UPDATE");
	ReplaceLower("HAVING");
	ReplaceLower("UNION");

	ReplaceLower("SUM");
	ReplaceLower("AND");
	ReplaceLower("ANY");
	ReplaceLower("APPLY");
	ReplaceLower("AS");
	ReplaceLower("BETWEEN");
	ReplaceLower("BY");
	ReplaceLower("CASE");
	ReplaceLower("CAST");
	ReplaceLower("COALESCE");
	ReplaceLower("CROSS");
	ReplaceLower("DESC");
	ReplaceLower("DISTINCT");
	ReplaceLower("ELSE");
	ReplaceLower("EXISTS");
	ReplaceLower("FOR");
	ReplaceLower("FROM");
	ReplaceLower("GROUP BY");
	ReplaceLower("IN");
	ReplaceLower("INNER");
	ReplaceLower("IS");
	ReplaceLower("ISNULL");
	ReplaceLower("JOIN");
	ReplaceLower("LEFT");
	ReplaceLower("LEN");
	ReplaceLower("LIKE");
	ReplaceLower("LTRIM");
	ReplaceLower("MATCHED");
	ReplaceLower("MAX");
	ReplaceLower("MERGE");
	ReplaceLower("MIN");
	ReplaceLower("NEWID");
	ReplaceLower("NOT");
	ReplaceLower("NULL");
	ReplaceLower("NULLIF");
	ReplaceLower("OBJECT_ID");
	ReplaceLower("ON");
	ReplaceLower("OR");
	ReplaceLower("ORDER BY");
	ReplaceLower("OUTPUT");
	ReplaceLower("OVER");
	ReplaceLower("PATH");
	ReplaceLower("READONLY");
	ReplaceLower("READPAST");
	ReplaceLower("ROOT");
	ReplaceLower("ROWCOUNT");
	ReplaceLower("DATEADD");
	ReplaceLower("RTRIM");
	ReplaceLower("SELECT");
	ReplaceLower("SET");
	ReplaceLower("SOME");
	ReplaceLower("SOURCE");
	ReplaceLower("SYSNAME");
	ReplaceLower("TARGET");
	ReplaceLower("THEN");
	ReplaceLower("TO");
	ReplaceLower("TOP");
	ReplaceLower("TRANCOUNT");
	ReplaceLower("UNION ALL");
	ReplaceLower("USING");
	ReplaceLower("VALUES");
	ReplaceLower("GETDATE");
	ReplaceLower("WHEN");
	ReplaceLower("WHERE");
	ReplaceLower("PRINT");
	ReplaceLower("FLOOR");
	ReplaceLower("ASCII");
	ReplaceLower("SCOPE_IDENTITY");
	ReplaceLower("PATINDEX");
	ReplaceLower("CONVERT");

	ReplaceLower("@@ROWCOUNT");
	ReplaceLower("@@TRANCOUNT");
	ReplaceLower("@@ERROR");
	ReplaceLower("@@PROCID");
	ReplaceLower("ERROR_MESSAGE");
	ReplaceLower("ERROR_SEVERITY");
	ReplaceLower("ERROR_PROCEDURE");
	ReplaceLower("ERROR_LINE");
	ReplaceLower("XACT_STATE");
	ReplaceLower("NOCOUNT");
	ReplaceLower("XACT_ABORT");
	ReplaceLower("TABLOCKX");


	ReplaceString("EXECUTE", "EXEC");
	ReplaceString("INSERT INTO", "INSERT");
	ReplaceString("OUTER JOIN", "JOIN");
	ReplaceString("TRANSACTION", "TRAN");

	ReplaceSpace();
	getinfo();

}

function getinfo()
{
	UltraEdit.activeDocument.findReplace.selectText=true;
	UltraEdit.activeDocument.findReplace.regExp=true;
	UltraEdit.activeDocument.findReplace.matchCase=true;
	UltraEdit.activeDocument.findReplace.matchWord=false;
	UltraEdit.activeDocument.findReplace.searchDown=true;
		
	UltraEdit.activeDocument.findReplace.find("[$][Dd][Aa][Tt][Ee]:.*$");
	if (UltraEdit.activeDocument.isFound()) {
			var dt=new Date();
			var month = dt.getMonth()+1;
			if (month<10) month='0'+month;
			var day = dt.getDate();
			if (day<10) day='0'+day;
			var year = dt.getFullYear();
			var t = dt.toLocaleTimeString();
			var ds = day+'.'+month+'.'+year + ' ' + t;
		  UltraEdit.activeDocument.key("DEL");
			UltraEdit.activeDocument.write('$Date: ' + ds +' $');
	}
	
	UltraEdit.activeDocument.top();
	
	UltraEdit.activeDocument.findReplace.find("[$][Ss][Oo][Uu][Rr][Cc][Ee]:.*$");
	if (UltraEdit.activeDocument.isFound()) {
		var spath = '$Source: '+ UltraEdit.activeDocument.path +' $';
		spath = spath.replace("D:\\","")
		UltraEdit.activeDocument.key("DEL");
		UltraEdit.activeDocument.write(spath);
	}

}

function ReplaceLower(str)
{
	var strlower = str.toLowerCase();
	var strFind = GetFindText(str, 0)
	ReplaceStr(strFind, strlower);
}

function ReplaceString (str, str2)
{
	var strlower = str2.toLowerCase();
	var strFind = GetFindText(str, 1)
	ReplaceStr(strFind, strlower);
}


function ReplaceStr (str, strlower){
	UltraEdit.activeDocument.findReplace.replace(str, strlower);
	if (UltraEdit.activeDocument.isFound())
	{	
		UltraEdit.activeDocument.top();
		//для отладки
		UltraEdit.outputWindow.write(strlower + ' /'+str+'/')
	}
}

function GetFindText(str, t)
{
	var res = "";
	var n = str.length;
	var StrLowerCase = "";
	//если ищем слово(а) в любом регистре
	if (t == 0)
	{
		StrLowerCase = "(?<!"+ str.toLowerCase()+ ")";
	}

	for (var i = 0; i < n; i++) {
		if (str[i].toUpperCase() == str[i].toLowerCase())
		{
			res = res + str[i];
		}
		else 
		{
			res = res + "[" + str[i].toUpperCase() + str[i].toLowerCase() + "]";
		}
	}

	res = "((?<=[ ,\t\(\);])|(?<=^))(" + res + ")"+ StrLowerCase +"((?=[ ,\t\(\);])|(?=$))"
	return res
}

function ReplaceSpace()
{
	UltraEdit.activeDocument.findReplace.matchWord=false;
	UltraEdit.activeDocument.findReplace.replaceAll=true;
	UltraEdit.activeDocument.findReplace.matchCase=false;

	ReplaceStr ("(?<=[A-zА-я0-9\)]),\t", ", ")
	ReplaceStr ("--ALTER .*\r\n", "")
	ReplaceStr ("\t, ", ",\t")
	ReplaceStr ("[(] ", "(")
	ReplaceStr (" [)]", ")")
	ReplaceStr (",(?=[A-zА-я0-9@\(])", ", ")
	ReplaceStr ("\r\n\r\n[g][o]", "\r\ngo")
}

Start();