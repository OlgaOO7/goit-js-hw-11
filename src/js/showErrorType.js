import { refs } from '../index';

export function showErrorNotFound() {
  const markupErr = `
    <div class="error-container">
      <img src="https://th.bing.com/th/id/R.2fa0e781e0ce67556696ff4c6c4b63e5?rik=hBRNVFxNOktXBQ&riu=http%3a%2f%2fwww.casadei.com%2fon%2fdemandware.static%2fSites-casadei-Site%2f-%2fdefault%2fdw4b2b381d%2fimages%2fnoimagezoom.png&ehk=wcv6SXPeSxuaULGIjt2rwDmNSUkUQD3%2fa2ISxDTgOkI%3d&risl=&pid=ImgRaw&r=0" alt="not-found" />
    </div>`;
    refs.galerryContainer.insertAdjacentHTML('beforeend', markupErr);
}