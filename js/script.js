const block_l = 600; //переменная длины блока(постоянная)
const block_w = 300; //Переменная ширины блока(постоянная)

function culc() {
  let error = 0; //переменная для ошибки
  /*Переменные для параметров здания (данные приходят из поля ввода)*/
  const build_l = Number(document.getElementById("build_l").value);
  const build_w = Number(document.getElementById("build_w").value);
  const build_h = Number(document.getElementById("build_h").value);

  if ((build_h > 0) & (block_l > 0) & (build_w > 0)) {
    document.getElementById("parametrs_build").innerHTML =
      build_l + " x " + build_w + " x " + build_h + " м";
  } else {
    error = error + 3;
  }

  /*Переменные для окон (данные приходят из поля ввода)*/
  const window_h = Number(document.getElementById("window_h").value);
  const window_w = Number(document.getElementById("window_w").value);
  const window_quant = Number(document.getElementById("window_quant").value);

  if (window_quant > 0) {
    document.getElementById("windows").innerHTML =
      window_h + " x " + window_w + " см, " + window_quant + " шт.";
  } else {
    document.getElementById("windows").innerText = "Без окон";
  }

  /*Перменные ля дверей (данные приходят из поля ввода)*/
  const door_h = Number(document.getElementById("door_h").value);
  const door_w = Number(document.getElementById("door_w").value);
  const door_quant = Number(document.getElementById("door_quant").value);

  if (door_quant > 0) {
    document.getElementById("doors").innerHTML =
      door_h + " x " + door_w + " см, " + door_quant + " шт.";
  } else {
    error = error + 1;
  }

  //переменная высоты блока (данные приходят из поля ввода)
  const block_h = Number(document.getElementById("block_type").value);

  //расчет площади всех стен дома в мм
  var square_house = 2 * build_h * (build_w + build_l) * 1000000;

  //Площадь окон и дверей в мм
  var square_wind = window_h * window_w * window_quant * 100;

  var square_door = door_h * door_w * door_quant * 100;

  //площадь стен с учетом оконных и дверных проемов
  var square = square_house - square_wind - square_door;

  var wall_thickness = Number(document.getElementById("wall_thickness").value); //толщина стен
  document.getElementById("wall_thickness_rez").innerHTML =
    wall_thickness + " мм";

  //Расчет площади видимой части блока
  if (wall_thickness == 300) {
    var square_block = block_l * block_h; //толщина - ширина блока 300мм
    document.getElementById("wall_thickness_rez").innerHTML =
      wall_thickness + " мм";
  } else {
    var square_block = block_l * block_w; //толщина - высота блока
    document.getElementById("wall_thickness_rez").innerHTML = block_h + " мм";
  }

  //Количество блоков, необходимых для строительства
  var quant_blocks = Math.ceil(square / square_block);
  document.getElementById("quant_blocks").innerHTML = quant_blocks + " шт.";

  //учет запаса 5%
  var quant_blocks_5 = Math.ceil(quant_blocks + quant_blocks * 0.05);
  document.getElementById("quant_blocks_5").innerHTML = quant_blocks_5 + " шт.";

  //кратно поддонам
  if (document.getElementById("pallets").checked) {
    if (block_h == 100) {
      var dop_param = "Кратно поддонам. </br>В одном поддоне 80 шт.";
      var pallets_count = Math.ceil(quant_blocks_5 / 80);
      var quant_blocks_end = pallets_count * 80;

      document.getElementById("pallet_parametr").innerHTML = dop_param;
      document.getElementById("quant_blocks_pallets").innerHTML =
        "Количество блоков: " + quant_blocks_end + " шт. </br>(Поддонов - " +
        pallets_count +" шт.)";

      document.getElementById("quant_blocks_end").innerHTML = quant_blocks_end + " шт.";
    }

    if (block_h == 200) {
      var dop_param = "Кратно поддонам. </br>В одном поддоне 40 шт.";
      var pallets_count = Math.ceil(quant_blocks_5 / 40);
      var quant_blocks_end = pallets_count * 40;

      document.getElementById("pallet_parametr").innerHTML = dop_param;
      document.getElementById("quant_blocks_pallets").innerHTML =
        "Количество блоков: " + quant_blocks_end + " шт. </br>(Поддонов - " +
        pallets_count + " шт.)";

      document.getElementById("quant_blocks_end").innerHTML =
        quant_blocks_end + " шт.";
    }

    if (block_h == 400) {
      var dop_param = "Кратно поддонам. </br>В одном поддоне 18 шт.";
      var pallets_count = Math.ceil(quant_blocks_5 / 18);
      var quant_blocks_end = pallets_count * 18;

      document.getElementById("pallet_parametr").innerHTML = dop_param;
      document.getElementById("quant_blocks_pallets").innerHTML =
        "Количество блоков: " + quant_blocks_end + " шт. </br>(Поддонов - " +
        pallets_count + " шт.)";

      document.getElementById("quant_blocks_end").innerHTML =
        quant_blocks_end + " шт.";
    }
  }
  if (!document.getElementById("pallets").checked) {
    document.getElementById("pallet_parametr").innerHTML =
      "Кратность поддонам - НЕТ";
      document.getElementById("quant_blocks_pallets").innerHTML=""
    document.getElementById("quant_blocks_end").innerHTML =
      quant_blocks_5 + " шт.";
  }

  if (block_h == 100) {
    document.getElementById("type_block_rez").innerHTML =
      "Малый, " + block_l + " x " + block_w + " x " + block_h + "мм";
  } else if (block_h == 200) {
    document.getElementById("type_block_rez").innerHTML =
      "Средний, " + block_l + " x " + block_w + " x " + block_h + "мм";
  } else if (block_h == 400) {
    document.getElementById("type_block_rez").innerHTML =
      "Крупный, " + block_l + " x " + block_w + " x " + block_h + "мм";
  }

  if (error != 0) {
    alert("Заполните обязательные поля! (Они помечены красной звездочкой)");
  } else {
    document.getElementById("result").style.visibility = "visible";
  }
}
