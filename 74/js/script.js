const KEY = "records";

// --- 保存されているデータを読む ---
function load() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

// --- データを保存 ---
function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

// --- 履歴を表示 ---
function render() {
  const history = document.getElementById("history");
  history.innerHTML = "";
  load().forEach(r => {
    const div = document.createElement("div");
    div.textContent = `体重: ${r[0]}kg / 日付: ${r[1]} / 食事: ${r[2].eat || "なし"}`;
    history.appendChild(div);
  });
}

// --- 記録処理（HTML の onclick="record()" から呼ばれる） ---
function record(event) {
  if (event) event.preventDefault();

  const weight = document.getElementById("body_weight").value;
  const day = document.getElementById("day").value;

  if (!weight || !day) {
    alert("体重と日付は必須です");
    return;
  }

  const form = document.querySelector("form");
  const fd = new FormData(form);

  // FormData → 普通のオブジェクト
  const obj = {};
  for (const [k, v] of fd.entries()) {
    if (obj[k]) {
      // 複数チェック用
      obj[k] = [].concat(obj[k], v);
    } else {
      obj[k] = v;
    }
  }

  const data = load();
  data.push([weight, day, obj]);
  save(data);

  render();
  form.reset();
}

// --- ページ読み込み時に復元 ---
window.onload = () => {
  render();
};