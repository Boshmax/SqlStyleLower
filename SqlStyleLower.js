//version 0.2

function Start() {
	var path = UltraEdit.activeDocument.path;
	var re = /.*\\.*\.sql/gi;
	var dt=new Date();
	ms = dt.getMilliseconds();

	UltraEdit.outputWindow.write(dt.toLocaleTimeString()+'.'+ ms);
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
	var dt2=new Date();
	ms = dt2.getMilliseconds();
	UltraEdit.outputWindow.write(dt2.toLocaleTimeString()+'.'+ ms);
	
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
	FindWordArray(['VARBINARY','BINARY','CHAR','TYPE','REAL','SMALLINT','TIME'])
	FindWordArray(['TINYINT','FLOAT','BIGINT','MONEY','UNIQUEIDENTIFIER','TABLE','SMALLDATETIME'])
	
	ReplaceLower("BIT");
	ReplaceLower("DATE");
	ReplaceLower("DATETIME");
	ReplaceLower("INT");
	ReplaceLower("NUMERIC");
	ReplaceLower("SMALLDATETIME");
	ReplaceLower("VARCHAR");
	ReplaceLower("XML");


	ReplaceLower("DECLARE");
	FindWordArray(['GRANT','TRIGGER','SAVE','INTO'])
	FindWordArray(['ALTER','CREATE','FUNCTION','PROCEDURE','VIEW','RETURNS','RETURN'])
	FindWordArray(['COMMIT','ROLLBACK','TRAN','CATCH','TRY'])
	FindWordArray(['BEGIN','END','EXEC','GO'])
	FindWordArray(['DELETE','INSERT','UPDATE','HAVING','UNION'])
	FindWordArray(['BREAK','IF','WHILE','WITH','ELSE'])

	FindWordArray(['SELECT','APPLY','FROM','INNER','JOIN','LEFT','CROSS','WHERE', 'ORDER BY', 'RAISERROR'])
	FindWordArray(['AS','BY','IN','IS','ISNULL','NULL','NULLIF','ON', 'OR','LIKE', 'AND'])
	FindWordArray(['SUM','ANY','BETWEEN','DISTINCT','DESC','GROUP BY','MAX','MIN', 'NOT'])
	FindWordArray(['MATCHED','MERGE','OVER','SOURCE','SOME','TARGET','USING','PATINDEX'])
	FindWordArray(['CASE','THEN','WHEN','TOP','CONVERT','CAST','COALESCE'])
	FindWordArray(['EXISTS','LEN','LTRIM','NEWID','OUTPUT','READONLY','READPAST'])
	FindWordArray(['ASCII','TO','SYSNAME','RTRIM','DATEADD','FOR','ROUND','FLOOR','OBJECT_ID'])
	FindWordArray(['SET','UNION ALL','VALUES','GETDATE','PRINT','SCOPE_IDENTITY'])
	FindWordArray(['PATH','ROOT','NOCOUNT','TABLOCKX'])
	FindWordArray(['CHARINDEX','SUBSTRING','OBJECTPROPERTY'])
	

	FindWordArray(['@@ROWCOUNT','@@TRANCOUNT','@@ERROR','@@PROCID'])
	FindWordArray(['ERROR_MESSAGE','ERROR_SEVERITY','ERROR_PROCEDURE','ERROR_LINE','XACT_STATE','XACT_ABORT'])

	ReplaceString("EXECUTE", "EXEC");
	ReplaceString("INSERT INTO", "INSERT");
	ReplaceString("OUTER JOIN", "JOIN");
	ReplaceString("TRANSACTION", "TRAN");

	ReplaceSpace();
	getinfo();

}


function FindWordArray(words)
{
	UltraEdit.activeDocument.top();
	UltraEdit.activeDocument.findReplace.matchWord=false;
	UltraEdit.activeDocument.findReplace.regExp=true;
	UltraEdit.activeDocument.findReplace.matchCase=true;

	var word
	var ReString = '('
	for (var i = 0; i < words.length; i++) {
		word = words[i]
		if (i == 0) {
			ReString = '('+ GetFindText(word , 0)
		}
		else {
			ReString = ReString +'|'+ GetFindText(word , 0)
		}
	}
	ReString = ReString + ')'
	//UltraEdit.outputWindow.write(ReString)
	UltraEdit.activeDocument.top();

	UltraEdit.activeDocument.findReplace.find(ReString);
	if (UltraEdit.activeDocument.isFound()) {
		for (var i = 0; i < words.length; i++) {
			//UltraEdit.outputWindow.write(words[i])
			ReplaceLower(words[i]);
			//UltraEdit.outputWindow.write(words[i])
		}
	}
}

//формирование и замена заголовка
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
//поиск и перевод слова в нижний регистр
function ReplaceLower(str)
{
	var strlower = str.toLowerCase();
	var strFind = GetFindText(str, 0)
	ReplaceStr(strFind, strlower);
}

//поиск строки и замена ее на другую строку
function ReplaceString (str, str2)
{
	var strlower = str2.toLowerCase();
	var strFind = GetFindText(str, 1)
	ReplaceStr(strFind, strlower);
}

//замена фразы
function ReplaceStr (str, strlower){
	UltraEdit.activeDocument.findReplace.replaceAll=true;
	UltraEdit.activeDocument.findReplace.replace(str, strlower);
	if (UltraEdit.activeDocument.isFound())
	{	
		UltraEdit.activeDocument.top();
		//дл€ отладки
		UltraEdit.outputWindow.write(strlower + ' /'+str+'/')
	}
}

//ѕолучаем регул€рное выражени€ на искомое слово
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

	res = "((?<=[ ,\t\(\)])|(?<=^))(" + res + ")"+ StrLowerCase +"((?=[ ,\t\(\)])|(?=$))"
	return res
}


//замена символов
function ReplaceSpace()
{
	UltraEdit.activeDocument.findReplace.matchWord=false;
	UltraEdit.activeDocument.findReplace.replaceAll=true;
	UltraEdit.activeDocument.findReplace.matchCase=false;

	ReplaceStr ("(?<=[A-zј-€0-9\)]),\t", ", ")
	ReplaceStr ("--ALTER .*\r\n", "")
	ReplaceStr ("\t, ", ",\t")
	ReplaceStr ("[(] ", "(")
	ReplaceStr (" [)]", ")")
	ReplaceStr (",(?=[A-zј-€0-9@\(])", ", ")
	ReplaceStr ("\r\n\r\n[g][o]", "\r\ngo")
}

Start();