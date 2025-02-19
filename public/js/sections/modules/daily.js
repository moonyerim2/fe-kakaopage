import { $$, getElementByAttrSelector } from '../../util/index.js';
import { SECTION } from '../../data/dataSet.js';
import {
  selectedTabClassName,
  clearGrid,
  selectToons,
  insertGridItem,
} from '../../common/index.js';

const accentTodayTab = day => {
  const tab = getElementByAttrSelector('day', day);
  tab.classList.add(selectedTabClassName());
};

const renderTodayToons = day => {
  return selectToons('week', day).then(dayToons =>
    insertGridItem(dayToons, SECTION.DAILY),
  );
};

const changeGridItems = target => {
  if (target.matches('[data-day]')) {
    const day = Number(target.dataset.day);
    selectToons('week', day).then(toons => {
      clearGrid(SECTION.DAILY);
      insertGridItem(toons, SECTION.DAILY);
    });
  } else {
    selectToons('finish', true).then(toons => {
      clearGrid(SECTION.DAILY);
      insertGridItem(toons, SECTION.DAILY);
    });
  }
};

const accentSelectedTab = target => {
  const section = getElementByAttrSelector('section', SECTION.DAILY);
  $$('.lnb__link', section).forEach(element => {
    element.classList.remove(selectedTabClassName());
  });
  target.classList.add(selectedTabClassName());
};

const moveTabOnClick = () => {
  const section = getElementByAttrSelector('section', SECTION.DAILY);
  section.addEventListener('click', ({ target }) => {
    if (!target.classList.contains('lnb__link')) {
      return;
    }

    accentSelectedTab(target);
    changeGridItems(target);
  });
};

const initDailySection = () => {
  let day = new Date().getDay();
  renderTodayToons(day);
  accentTodayTab(day);
  moveTabOnClick();
};

export { initDailySection };
