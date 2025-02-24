const apiUrl = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc";
const serviceKey =
  "MW5AXazYOfZoz46a1oVy%2FFPMg3H%2BA0o010oRwOwTSOVEyVdSSNAQ%2BZEI6PATXgaXh7GX8YR87w93PK9KBB74jw%3D%3D";

const fetchXml = async (url, container, targets) => {
  //! /로 주소를 구분함 endpoint
  //Todo 1. url 인자값으로 받기
  const res = await fetch(url);
  if (!res.ok) {
    return alert(res.statusText);
  }
  //!   const data = await res.json() json으로 전달받은 데이터만 가공 해줌
  const data = await res.text(); //! xml 자료 받아오는 법
  const domParser = new DOMParser();
  const node = domParser.parseFromString(data, "text/xml");
  //Todo: 가져올 태그 이름 확인하기
  //! item
  const items = node.getElementsByTagName(container); //Todo 2. 컨테이너이름 인자값으로 받기
  let cities = [];
  //Todo: 가져올 값 이름 확인하기
  //! orgCd, orgdownNm
  for (let city of items) {
    let item = {};
    //Todo 3. targets 인자값으로 받기
    for (let target of targets) {
      item[target] = city.getElementsByTagName(target)[0].textContent;
    }
    cities.push(item);
  }
  console.log(cities);
};

fetchXml(`${apiUrl}?serviceKey=${serviceKey}`, "item", ["orgCd", "orgDownNm"]);

let person = {};

//name을 주는 법
const target = "name";
const targets = ["name", "age"];

const Xml = `<person>
<name>Dexter yoon</name>
<age>20</age>
</person>`;

const items = Xml.getElementsByTagName("person");

for (let item of items) {
  let person = {};
}
for (let target of targets) {
  person[target] = item.getElementsByTagName(target[0].textContent);
}

//person.name === 'Dexter Yoon'
// person.age =20

const url2 = `${apiUrl}/shelter?serviceKey=${serviceKey}&
upr_cd=6110000&org_cd=3220000`;

const targets2 = ["careRegNo", "careNm"];
// fetchXml(url2, "item", targets2);

const url3 = `${apiUrl}/abandonmentPublic?serviceKey=${serviceKey}`;
const t3 = [`noticeNo`, "age", "weight", "kindCd", "specialMark"];

fetchXml(url3, "item", t3);
