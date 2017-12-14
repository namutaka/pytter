
class ColorUtil {
  static colorList = [
    Colors.red700,
    Colors.red800,
    Colors.red900,
    Colors.pink700,
    Colors.pink800,
    Colors.pink900,
    Colors.purple700,
    Colors.purple800,
    Colors.purple900,
    Colors.deepPurple700,
    Colors.deepPurple800,
    Colors.deepPurple900,
    Colors.indigo700,
    Colors.indigo800,
    Colors.indigo900,
    Colors.blue700,
    Colors.blue800,
    Colors.blue900,
    Colors.lightBlue700,
    Colors.lightBlue800,
    Colors.lightBlue900,
    Colors.cyan700,
    Colors.cyan800,
    Colors.cyan900,
    Colors.teal700,
    Colors.teal800,
    Colors.teal900,
    Colors.green700,
    Colors.green800,
    Colors.green900,
    Colors.lightGreen700,
    Colors.lightGreen800,
    Colors.lightGreen900,
    Colors.lime700,
    Colors.lime800,
    Colors.lime900,
    Colors.deepOrange700,
    Colors.deepOrange800,
    Colors.deepOrange900,
    Colors.brown700,
    Colors.brown800,
    Colors.brown900,
    Colors.blueGrey700,
    Colors.blueGrey800,
    Colors.blueGrey900,
    Colors.grey700,
    Colors.grey800,
    Colors.grey900,
  ]

  static text2color(str) {
    var num = 0
    for (var i = 0; i < str.length; i++) {
      num = num + str.charCodeAt(i);
    }
    return this.colorList[num % this.colorList.length]
  }
}

export default ColorUtil

