import React from 'react';
import styled from 'styled-components';

// ── Iridescent Button Component ──
const IridescentButton = () => {
  return (
    <div className="btn-wrapper">
      <button className="iridescent-btn">
        <span className="btn-text">Get Started</span>
      </button>
    </div>
  );
};

// ── Pokémon Card Component ──
const PokemonCard = () => {
  return (
    <div className="card-container">
      <div className="hover-zone tl" />
      <div className="hover-zone tr" />
      <div className="hover-zone bl" />
      <div className="hover-zone br" />
      <div className="playing-card">
        <div className="shimmer" />
        <div className="card-inner-content">
          <div className="card-header">
            <div className="header-left">
              <span className="stage-label">Basic Pokémon</span>
              <span className="pokemon-name">Bovineon</span>
            </div>
            <div className="header-right">
              <span className="hp-label">HP</span>100
              <div className="type-icon-header">
                <svg className="icon-svg" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="art-box">
            <div className="bg-clipper">
              <div className="parallax-layer layer-sky" />
              <div className="parallax-layer layer-grass">
                <div className="grass-shape" />
              </div>
            </div>
            <div className="parallax-layer layer-pokemon">
              <svg className="main-svg-image" height="150px" width="200px" id="_x36_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#000000">
                <g>
                  <g>
                    <path style={{fill: '#ECE1D4'}} d="M302.324,473.485h-60.715V512h60.715c10.628,0,19.258-8.618,19.258-19.251 C321.582,482.121,312.952,473.485,302.324,473.485z" />
                    <path style={{fill: '#F8EDE2'}} d="M199.625,473.485c-10.622,0-19.251,8.636-19.251,19.263c0,10.634,8.63,19.251,19.251,19.251h41.984 v-38.515H199.625z" />
                  </g>
                  <path style={{fill: '#F8DBC0'}} d="M183.806,86.173c-35.953,0-71.888-42.786-58.198-75.307c5.129-11.961-1.713-15.393-15.409-3.413 c-13.684,11.993-39.373,82.152,44.508,119.803L183.806,86.173z" />
                  <path style={{fill: '#6F6254'}} d="M19.484,110.571c12.844-3.426,63.33-8.567,102.69,13.696c10.787,6.1,16.261,8.574,25.68-0.864 c15.424-15.418,0.614,76.171-6.855,76.171c-10.268,0-35.934,0-54.76,0c-29.101,0-56.196-15.819-68.478-30.805 C2.359,149.938-13.758,119.433,19.484,110.571z" />
                  <g>
                    <path style={{fill: '#6F6254'}} d="M183.756,77.962c-0.301,0-0.739,0-1.04,0c-17.447,0-23.798,7.941-30.145,22.213 c-6.338,14.266-24.233,71.161-28.557,80.874c-6.344,14.285-6.319,30.148-6.319,50.764c0,20.623,0,100.571,0,124.361 c0,10.427,6.717,21.756,17.326,32.265c2.135,2.129,4.402,4.215,6.679,6.25C277.055,257.108,215.056,116.276,183.756,77.962z" />
                    <path style={{fill: '#FFFDF9'}} d="M183.756,77.962c31.3,38.314,93.299,179.146-42.056,316.728 c12.215,10.935,25.147,20.516,25.147,26.528c0,12.688-6.331,22.207-6.331,39.648c0,17.447,15.581,29.434,43.7,29.434 c14.279,0,56.232,0,56.232,0V77.962C241.728,77.962,201.711,77.962,183.756,77.962z" />
                  </g>
                  <g>
                    <path style={{fill: '#EFCDAE'}} d="M318.244,86.173c35.947,0,71.894-42.786,58.191-75.307c-5.142-11.961,1.716-15.393,15.4-3.413 c13.702,11.993,39.372,82.152-44.489,119.803L318.244,86.173z" />
                    <path style={{fill: '#8B7B67'}} d="M371.964,238.684c0.645,1.835,1.052,3.758,1.052,5.812c0,9.92-8.054,17.986-17.974,17.986 c-9.932,0-17.98-8.066-17.98-17.986c0-0.419,0.107-0.827,0.138-1.234C350.177,232.484,363.322,236.054,371.964,238.684z" />
                    <g>
                      <path style={{fill: '#F8EDE2'}} d="M356.828,119.802c-2.975-8.517-5.618-15.706-7.365-19.627 c-6.343-14.272-12.681-22.213-30.122-22.213c-17.467,0-58.693,0-77.731,0V490.3c0,0,41.94,0,56.219,0 c28.125,0,43.706-11.987,43.706-29.434c0-14.022-4.052-22.939-5.661-32.484C227.731,285.878,306.495,145.673,356.828,119.802z" />
                      <path style={{fill: '#625549'}} d="M367.029,388.44c10.602-10.509,17.328-21.838,17.328-32.265c0-23.791,0-103.738,0-124.361 c0-20.616,0.019-36.479-6.325-50.764c-3.131-7.039-13.389-38.833-21.205-61.248c-50.332,25.871-129.096,166.076-20.955,308.58 c-0.401-2.323-0.676-4.672-0.676-7.164C335.197,414.079,353.427,401.942,367.029,388.44z" />
                    </g>
                  </g>
                  <path style={{fill: '#8B7B67'}} d="M46.867,161.918c-5.997-5.993-8.555-23.973,6.848-22.238c15.409,1.69,54.772,17.097,54.772,23.947 C108.487,170.479,77.127,192.185,46.867,161.918z" />
                  <path style={{fill: '#625549'}} d="M489.437,110.571c-12.851-3.426-63.34-8.567-102.705,13.696c-10.778,6.1-16.264,8.574-25.677-0.864 c-15.431-15.418-0.607,76.171,6.864,76.171c10.258,0,35.922,0,54.747,0c29.102,0,56.206-15.819,68.481-30.805 C506.552,149.938,522.659,119.433,489.437,110.571z" />
                  <path style={{fill: '#8B7B67'}} d="M462.031,161.918c6.006-5.993,8.561-23.973-6.839-22.238c-15.406,1.69-54.772,17.097-54.772,23.947 C400.421,170.479,431.79,192.185,462.031,161.918z" />
                  <g>
                    <path style={{fill: '#342928'}} d="M130.077,238.684c-0.633,1.835-1.049,3.758-1.049,5.812c0,9.92,8.051,17.986,17.98,17.986 c9.917,0,17.967-8.066,17.967-17.986c0-0.419-0.088-0.827-0.132-1.234C151.867,232.484,138.719,236.054,130.077,238.684z" />
                    <path style={{fill: '#342928'}} d="M371.964,238.684c0.645,1.835,1.052,3.758,1.052,5.812c0,9.92-8.054,17.986-17.974,17.986 c-9.932,0-17.98-8.066-17.98-17.986c0-0.419,0.107-0.827,0.138-1.234C350.177,232.484,363.322,236.054,371.964,238.684z" />
                  </g>
                  <g>
                    <path style={{fill: '#4F4B4A'}} d="M204.147,431.407c15.725-6.056,18.63,30.649,10.101,33.686 C198.517,470.711,189.542,437.012,204.147,431.407z" />
                    <path style={{fill: '#4F4B4A'}} d="M292.442,431.407c-15.731-6.056-18.643,30.649-10.107,33.686 C298.06,470.711,307.052,437.012,292.442,431.407z" />
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div className="info-strip">Cow Pokémon. Length: 5'02", Weight: 450 lbs.</div>
          <div className="attacks-container">
            <div className="attack-row">
              <div className="energy-cost">
                <div className="energy-orb colorless">
                  <svg className="icon-svg" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
              </div>
              <div className="attack-mid">
                <div className="attack-name">Headbutt</div>
              </div>
              <div className="attack-damage">20</div>
            </div>
            <div className="attack-row">
              <div className="energy-cost">
                <div className="energy-orb colorless">
                  <svg className="icon-svg" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="energy-orb colorless">
                  <svg className="icon-svg" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="energy-orb colorless">
                  <svg className="icon-svg" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
              </div>
              <div className="attack-mid">
                <div className="attack-name">Stampede</div>
                <div className="attack-desc">
                  Flip a coin. If tails, this Pokémon does 20 damage to itself.
                </div>
              </div>
              <div className="attack-damage">80</div>
            </div>
          </div>
          <div className="footer-stats">
            <div className="stat-box">
              <span>Weakness</span>
              <div className="energy-orb fighting">
                <svg className="icon-svg" viewBox="0 0 24 24">
                  <path d="M23 10h-3V7c0-1.1-.9-2-2-2s-2 .9-2 2v3h-1V5c0-1.1-.9-2-2-2s-2 .9-2 2v5h-1V7c0-1.1-.9-2-2-2s-2 .9-2 2v3H3c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              <span>×2</span>
            </div>
            <div className="stat-box">
              <span>Resistance</span>
            </div>
            <div className="stat-box">
              <span>Retreat Cost</span>
              <div className="energy-orb colorless">
                <svg className="icon-svg" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <div className="energy-orb colorless">
                <svg className="icon-svg" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <div className="energy-orb colorless">
                <svg className="icon-svg" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bottom-metadata">
            <div className="illustrator">
              Illus. The User • 58/102
              <svg className="icon-svg star-svg" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <svg className="pokemon-logo-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.463 11.691c-0.081 -0.436 -0.651 -0.676 -1.217 -0.368l0.146 0.498 0.23 0.737 0.104 0.335c0.423 -0.272 0.85 -0.599 0.737 -1.203zm-0.562 0.67a56.82 56.82 0 0 0 -0.197 -0.636l-0.059 -0.203a0.54 0.54 0 0 1 0.33 0.033c0.053 0.026 0.146 0.084 0.166 0.196 0.047 0.25 -0.037 0.429 -0.24 0.608zm9.108 -1.362a0.774 0.774 0 1 0 -0.963 1.207l1.018 -1.153a1.058 1.058 0 0 0 -0.055 -0.054zm-0.961 0.812a0.5 0.5 0 0 1 0.618 -0.707zm7.551 0.225a0.375 0.375 0 0 1 0.013 0.105c-0.01 0.215 -0.213 0.382 -0.454 0.37 -0.241 -0.008 -0.43 -0.191 -0.42 -0.405 0.007 -0.203 0.187 -0.362 0.409 -0.372a0.712 0.712 0 0 0 -0.132 -0.017c-0.405 -0.017 -0.735 0.27 -0.748 0.626 -0.017 0.38 0.289 0.692 0.686 0.709 0.406 0.015 0.735 -0.272 0.75 -0.651a0.625 0.625 0 0 0 -0.103 -0.365m-12.255 0.436c0 0.216 -0.197 0.39 -0.438 0.39 -0.242 0 -0.438 -0.173 -0.438 -0.39 0 -0.202 0.173 -0.368 0.394 -0.388a0.736 0.736 0 0 0 -0.132 -0.012c-0.404 0 -0.723 0.3 -0.723 0.656 0 0.382 0.32 0.68 0.716 0.68 0.405 0 0.723 -0.298 0.723 -0.68a0.605 0.605 0 0 0 -0.119 -0.358c0.01 0.03 0.017 0.065 0.017 0.102m14.768 -2.185 -0.18 0.739 -0.166 -0.82 -2.218 -0.487 0.016 1.233 0.334 0.075 -0.024 0.223 -0.01 -0.007c-0.414 -0.218 -0.927 -0.24 -1.41 -0.058 -0.163 0.06 -0.314 0.143 -0.45 0.242l-0.335 -2.112h-1.475l-0.04 0.244h-1.553l-0.177 1.085 -0.13 -0.159a1.986 1.986 0 0 0 -1.525 -0.73l1.318 -0.709 -0.918 -1.37 -1.663 1.913 0.287 0.35a2.19 2.19 0 0 0 -0.674 0.429L9.696 9.104l-0.497 0.953 0.019 -0.916 -2.226 0.712 0.057 1.196 0.379 -0.098 0.056 0.605c-0.433 -0.193 -0.954 -0.19 -1.436 0.014a2.12 2.12 0 0 0 -0.399 0.229 1.695 1.695 0 0 0 -0.077 -1.058 1.904 1.904 0 0 0 -0.817 -0.9 1.958 1.958 0 0 0 -0.865 -0.308c-0.77 -0.135 -1.696 0.003 -2.606 0.392a6.339 6.339 0 0 0 -0.928 0.483L0 10.634l0.215 0.363 0.667 1.127s0.204 0.346 0.205 0.345l0.361 -0.177 0.05 -0.023 1.658 3.7 0.16 0.355 0.37 -0.118 0.896 -0.288 0.394 -0.125 -0.104 -0.4 -0.476 -1.829c0.137 -0.101 0.264 -0.209 0.383 -0.321 -0.027 0.219 -0.013 0.44 0.047 0.652 0.124 0.443 0.416 0.793 0.818 0.986 0.435 0.21 0.965 0.21 1.456 0.002 0.247 -0.104 0.467 -0.257 0.651 -0.439l0.068 0.728 1.57 -0.231 -0.002 -1.407 3.282 1.62v-1.57a3.335 3.335 0 0 0 1.347 -0.436l-0.138 0.843 1.77 0.279 0.097 -0.637 0.461 0.854 0.283 -0.545 0.104 0.895 2.005 0.352 -0.106 -0.674a1.817 1.817 0 0 0 1.038 -0.198l-0.08 0.718 1.336 0.189 0.01 0.547 1.39 0.438L24 10.745zm-7.839 0.81 0.092 -0.097 -0.112 0.69 -0.289 -0.262zm-1.177 -2.813 0.487 0.661 -1.39 0.689 -0.097 -0.146zm-9.202 5.091 0.555 2.128 -0.898 0.287 -1.841 -4.112c-0.1 0.053 -0.284 0.14 -0.455 0.223L0.59 10.775c0.266 -0.169 0.556 -0.319 0.865 -0.45 0.868 -0.369 1.697 -0.48 2.36 -0.362 0.233 0.027 0.481 0.095 0.7 0.24 0.298 0.168 0.525 0.406 0.657 0.711 0.32 0.74 -0.215 1.807 -1.276 2.461zm4.126 -0.378c-0.01 0.318 -0.127 0.634 -0.321 0.903a1.797 1.797 0 0 1 -0.749 0.605c-0.779 0.33 -1.557 0 -1.764 -0.74 -0.203 -0.714 0.266 -1.565 1.02 -1.89 0.483 -0.202 0.966 -0.155 1.312 0.08 0.213 0.146 0.377 0.364 0.453 0.637a1.33 1.33 0 0 1 0.049 0.406zm4.236 1.504 -3.254 -1.629 0.006 1.707 -0.843 0.115 -0.059 -0.703c0.26 -0.446 0.355 -0.972 0.22 -1.454a1.526 1.526 0 0 0 -0.4 -0.68l-0.121 -1.433 -0.377 0.098 -0.017 -0.362 1.352 -0.404 0.083 1.396 0.997 -1.4 0.974 0.927 -1.362 1.436 1.28 0.507c0.142 0.27 0.36 0.5 0.634 0.67 0.264 0.163 0.568 0.26 0.889 0.291v0.918zm-1.69 -2.36 -0.454 -0.174 0.423 -0.41c-0.019 0.188 -0.01 0.385 0.03 0.584zm3.542 0.427c-0.312 0.259 -0.67 0.427 -1.139 0.54a2.216 2.216 0 0 1 -0.302 0.051c-0.747 0.073 -1.374 -0.27 -1.612 -0.826a1.191 1.191 0 0 1 -0.069 -0.209c-0.11 -0.468 -0.016 -0.887 0.21 0.215 -1.215a1.47 1.47 0 0 1 0.235 -0.261 1.87 1.87 0 0 1 0.812 -0.413c0.712 -0.171 1.339 0.046 1.723 0.517l-1.355 1.444a0.978 0.978 0 0 0 0.345 -0.033c0.323 -0.079 0.504 -0.25 0.663 -0.436l0.542 0.486 0.164 0.15a3.016 3.016 0 0 1 -0.222 0.205zm2.877 1.927 -0.294 -1.954 -0.418 1.078 -0.625 -1.348h-0.007l-0.246 1.56 -1.041 -0.18 0.146 -0.87a4.17 4.17 0 0 0 0.116 -0.114l0.338 -0.348 -0.329 -0.294 0.35 -2.073h1.05l0.262 1.436 0.294 -1.663h0.752l0.312 2.026c-0.396 0.451 -0.59 1.06 -0.456 1.615a1.478 1.478 0 0 0 0.865 1.035l0.04 0.263zm2.595 -0.637a1.64 1.64 0 0 1 -0.377 0.2 1.397 1.397 0 0 1 -0.773 0.077 1.153 1.153 0 0 1 -0.448 -0.19 1.118 1.118 0 0 1 -0.43 -0.655c-0.08 -0.336 -0.007 -0.696 0.174 -1.012 0.091 -0.154 0.207 -0.298 0.344 -0.423 0.152 -0.137 0.33 -0.25 0.527 -0.325 0.459 -0.172 0.912 -0.112 1.23 0.116a1.08 1.08 0 0 1 0.422 0.633c0.098 0.406 -0.018 0.838 -0.274 1.187a1.75 1.75 0 0 1 -0.395 0.392zm2.343 1.841 -0.77 -0.229 -0.066 -2.838 -0.388 2.19 -0.84 -0.135 0.062 -0.63c0.547 -0.464 0.838 -1.195 0.679 -1.856a1.457 1.457 0 0 0 -0.434 -0.744l0.071 -0.743 -0.317 -0.085 0.02 -0.396 1.448 0.29 0.487 2.308 0.499 -2.069 1.1 0.244z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Duck 404 Component ──
const DuckCard = () => {
  return (
    <div className="card">
      <div className="orb orb--1" />
      <div className="orb orb--2" />
      <div className="orb orb--3" />
      <div className="orb orb--4" />
      <div className="error-container">
        <div className="error-code">404</div>
        <div className="error-msg">Nothing to see here.</div>
        <a href="/" className="home-btn" onClick={(e) => e.preventDefault()}>Go Home</a>
      </div>
      <div className="duck__wrapper">
        <div className="duck">
          <div className="duck__inner">
            <div className="duck__mouth" />
            <div className="duck__head">
              <div className="duck__eye" />
              <div className="duck__white" />
            </div>
            <div className="duck__body" />
            <div className="duck__wing" />
          </div>
          <div className="duck__foot duck__foot--1" />
          <div className="duck__foot duck__foot--2" />
          <div className="surface" />
        </div>
      </div>
    </div>
  );
};

// ── Weather Card Component ──
const WeatherCard = () => {
  return (
    <div className="weather-card-container">
      <div className="weather-card-main duration-300 font-mono text-white group cursor-pointer relative overflow-hidden bg-[#DCDFE4] w-28 h-48 dark:bg-[#22272B] rounded-3xl p-4 hover:w-56 hover:bg-blue-200 hover:dark:bg-[#0C66E4]">
        <h3 className="text-xl text-center">Today</h3>
        <div className="gap-4 relative weather-icon-wrap">
          <svg viewBox="0 0 64 64" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" className="weather-svg w-20 scale-[110%]">
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" y2="28.33" y1="19.67" x2="21.5" x1="16.5" id="b">
                <stop stopColor="#fbbf24" offset={0} />
                <stop stopColor="#fbbf24" offset=".45" />
                <stop stopColor="#f59e0b" offset={1} />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" y2="50.8" y1="21.96" x2="39.2" x1="22.56" id="c">
                <stop stopColor="#f3f7fe" offset={0} />
                <stop stopColor="#f3f7fe" offset=".45" />
                <stop stopColor="#deeafb" offset={1} />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" y2="48.05" y1="42.95" x2="25.47" x1="22.53" id="a">
                <stop stopColor="#4286ee" offset={0} />
                <stop stopColor="#4286ee" offset=".45" />
                <stop stopColor="#0950bc" offset={1} />
              </linearGradient>
              <linearGradient xlinkHref="#a" y2="48.05" y1="42.95" x2="32.47" x1="29.53" id="d" />
              <linearGradient xlinkHref="#a" y2="48.05" y1="42.95" x2="39.47" x1="36.53" id="e" />
            </defs>
            <circle strokeWidth=".5" strokeMiterlimit={10} stroke="#f8af18" fill="url(#b)" r={5} cy={24} cx={19} />
            <path d="M19 15.67V12.5m0 23v-3.17m5.89-14.22l2.24-2.24M10.87 32.13l2.24-2.24m0-11.78l-2.24-2.24m16.26 16.26l-2.24-2.24M7.5 24h3.17m19.83 0h-3.17" strokeWidth={2} strokeMiterlimit={10} strokeLinecap="round" stroke="#fbbf24" fill="none">
              <animateTransform values="0 19 24; 360 19 24" type="rotate" repeatCount="indefinite" dur="45s" attributeName="transform" />
            </path>
            <path d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z" strokeWidth=".5" strokeMiterlimit={10} stroke="#e6effc" fill="url(#c)" />
            <path d="M24.39 43.03l-.78 4.94" strokeWidth={2} strokeMiterlimit={10} strokeLinecap="round" stroke="url(#a)" fill="none">
              <animateTransform values="1 -5; -2 10" type="translate" repeatCount="indefinite" dur="0.7s" attributeName="transform" />
            </path>
            <path d="M31.39 43.03l-.78 4.94" strokeWidth={2} strokeMiterlimit={10} strokeLinecap="round" stroke="url(#d)" fill="none">
              <animateTransform values="1 -5; -2 10" type="translate" repeatCount="indefinite" dur="0.7s" begin="-0.4s" attributeName="transform" />
            </path>
            <path d="M38.39 43.03l-.78 4.94" strokeWidth={2} strokeMiterlimit={10} strokeLinecap="round" stroke="url(#e)" fill="none">
              <animateTransform values="1 -5; -2 10" type="translate" repeatCount="indefinite" dur="0.7s" begin="-0.2s" attributeName="transform" />
            </path>
          </svg>
          <h4 className="font-sans duration-300 absolute left-1/2 -translate-x-1/2 text-5xl text-center group-hover:translate-x-8 group-hover:-translate-y-16 group-hover:scale-150 weather-temp">
            6°
          </h4>
        </div>
        <div className="absolute duration-300 -left-32 mt-2 group-hover:left-10 weather-details">
          <p className="text-sm">Heavy Raining</p>
          <p className="text-sm">50% humidity</p>
        </div>
      </div>
    </div>
  );
};

// ── Premium Font Card Component ──
const PremiumFontCard = () => {
  return (
    <div className="font-card-container">
      <div className="card">
        <div className="wrapper">
          <div className="card-image">III</div>
          <div className="content">
            <p className="title">UIVERSE PREMIUM FONT (REGULAR)</p>
            <p className="title price">$3</p>
            <p className="title price old-price">&nbsp;$6</p>
            <p />
          </div>
          <button className="card-btn">DOWNLOAD</button>
        </div>
        <p className="tag">-50%</p>
      </div>
    </div>
  );
};

// ── Animated Face Component ──
const AnimatedFace = () => {
  return (
    <div className="my-custom-face-container">
      <svg className="face" viewBox="0 0 320 380">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={25}>
          <g className="face__eyes" transform="translate(0,112.5)">
            <g transform="translate(15,0)">
              <polyline className="face__eye-lid" points="37,0 0,120 75,120" />
              <polyline className="face__pupil" points="55,120 55,155" strokeDasharray="35 35" />
            </g>
            <g transform="translate(230,0)">
              <polyline className="face__eye-lid" points="37,0 0,120 75,120" />
              <polyline className="face__pupil" points="55,120 55,155" strokeDasharray="35 35" />
            </g>
          </g>
          <rect className="face__nose" x="132.5" y="112.5" width={55} height={155} rx={4} ry={4} />
          <g transform="translate(65,334)" strokeDasharray="102 102">
            <path className="face__mouth-left" d="M 0 30 C 0 30 40 0 95 0" />
            <path className="face__mouth-right" d="M 95 0 C 150 0 190 30 190 30" />
          </g>
        </g>
      </svg>
    </div>
  );
};

// ── Aether Toast Notification Component ──
const AetherToast = () => {
  return (
    <div className="aether-toast-container">
      <div className="aether-toast" role="status" aria-live="polite">
        <span className="aether-toast__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <div className="aether-toast__content">
          <p className="aether-toast__title">Lighting pass approved</p>
          <p className="aether-toast__message">
            Your refraction settings were saved to the workspace.
          </p>
        </div>
        <span className="aether-toast__meta">+12</span>
        <button className="aether-toast__close" type="button" aria-label="Dismiss">
          <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function StitchPlayground() {
  return (
    <StyledWrapper className="stitch-fade-in">
      <section className="playground-hero">
        <div className="hero-mesh"></div>
        <div className="hero-content">
          <div className="status-pill">Interactive UI/UX Playground</div>
          <h2 className="playground-title">STITCH<br />TEMPLATES</h2>
          <p className="playground-subtitle">
            Premium, high-performance web components built with interactive micro-animations and holographic aesthetics.
          </p>
        </div>
      </section>

      <div className="playground-grid-container">
        <div className="playground-section">
          <h3>Holographic 3D Pokémon Card</h3>
          <p className="component-desc">Move your cursor over the card to experience 3D parallax tilt and holographic color-dodge shimmer.</p>
          <div className="card-demo-wrap">
            <PokemonCard />
          </div>
        </div>

        <div className="playground-section">
          <h3>Iridescent Glow Action</h3>
          <p className="component-desc">Click the button below to witness a conic-gradient iris ripple expansion with an interactive blur layer.</p>
          <div className="button-demo-wrap">
            <IridescentButton />
          </div>
        </div>

        <div className="playground-section">
          <h3>Interactive Weather Expand Card</h3>
          <p className="component-desc">Hover over the weather card to expand it and reveal detailed metrics like humidity, wind speed, real feel, and air quality.</p>
          <div className="card-demo-wrap" style={{ height: '340px' }}>
            <WeatherCard />
          </div>
        </div>

        <div className="playground-section">
          <h3>Uiverse Premium Font Card</h3>
          <p className="component-desc">Sleek, minimal pricing and download card featuring dynamic height transitions and custom pricing badges on hover.</p>
          <div className="card-demo-wrap" style={{ height: '340px' }}>
            <PremiumFontCard />
          </div>
        </div>

        <div className="playground-section full-width">
          <h3>Cybernetic Duck 404 Canvas</h3>
          <p className="component-desc">Hover to accelerate the running speed of the vector-drawn duck, distort the space orbs, and fade the background 404 code.</p>
          <div className="duck-demo-wrap">
            <DuckCard />
          </div>
        </div>

        <div className="playground-section full-width">
          <h3>Blinking Cybernetic Face Canvas</h3>
          <p className="component-desc">Interactive SVG face featuring fluid blinking transitions, pupillary dilations, and animated nose/mouth responsive cycles.</p>
          <div className="duck-demo-wrap" style={{ minHeight: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedFace />
          </div>
        </div>

        <div className="playground-section full-width">
          <h3>Aether Glass Toast Notification</h3>
          <p className="component-desc">Premium glassmorphism notification toast with frosted backdrop blur, layered bevel highlights, and smooth spring-physics entrance animation.</p>
          <div className="duck-demo-wrap" style={{ minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AetherToast />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

// ── Combined Styled Wrapper ──
const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg-deep);
  color: var(--text-primary);
  min-height: 100vh;
  padding-bottom: 5rem;

  .stitch-fade-in {
    animation: fadeIn 0.5s var(--ease-out);
  }

  .playground-hero {
    position: relative;
    width: 100%;
    height: 320px;
    background: radial-gradient(circle at 80% 20%, rgba(123, 79, 196, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(196, 97, 74, 0.1) 0%, transparent 50%),
                var(--bg-base);
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--border);
    overflow: hidden;
  }

  .hero-mesh {
    position: absolute;
    inset: 0;
    opacity: 0.05;
    background-image: linear-gradient(var(--border) 1px, transparent 1px),
                      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: center;
  }

  .hero-content {
    text-align: center;
    z-index: 2;
    padding: 0 1.5rem;
  }

  .status-pill {
    display: inline-block;
    padding: 6px 14px;
    background: var(--accent-subtle);
    border: 1px solid var(--border);
    color: var(--accent);
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 99px;
    margin-bottom: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .playground-title {
    font-size: 3rem;
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -2px;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .playground-subtitle {
    font-size: 1rem;
    color: var(--text-secondary);
    max-width: 500px;
    margin: 0 auto;
    font-weight: 500;
  }

  .playground-grid-container {
    max-width: 1200px;
    width: 90%;
    margin-top: 3rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  .playground-section {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: var(--shadow-sm);
    transition: box-shadow 0.3s ease;
  }

  .playground-section:hover {
    box-shadow: var(--shadow-md);
  }

  .playground-section.full-width {
    grid-column: span 2;
    width: 100%;
  }

  .playground-section h3 {
    font-size: 1.35rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
    text-align: center;
  }

  .component-desc {
    font-size: 0.88rem;
    color: var(--text-secondary);
    text-align: center;
    margin-bottom: 2rem;
    max-width: 420px;
    line-height: 1.4;
  }

  .card-demo-wrap {
    height: 480px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button-demo-wrap {
    height: 480px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .duck-demo-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .playground-grid-container {
      grid-template-columns: 1fr;
    }
    .playground-section.full-width {
      grid-column: span 1;
    }
    .playground-title {
      font-size: 2.25rem;
    }
  }

  /* ══════════════════════════════════════════
     IRIDESCENT BUTTON INNER STYLES
  ══════════════════════════════════════════ */
  .btn-wrapper {
    position: relative;
    display: inline-block;
    border-radius: 999px;
  }

  .btn-wrapper::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    background: conic-gradient(
      from 0deg,
      #c4614a,
      #d4a845,
      #a8d4b8,
      #6b9fd4,
      #7b4fc4,
      #c44a8c,
      #c4614a
    );
    filter: blur(3px);
    pointer-events: none;
    z-index: -1;
  }

  @keyframes iridescentRipple {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
      filter: blur(2px);
    }
    50% {
      opacity: 0.65;
      filter: blur(10px);
    }
    100% {
      transform: translate(-50%, -50%) scale(11);
      opacity: 0;
      filter: blur(24px);
    }
  }

  .btn-wrapper:active::before {
    animation: iridescentRipple 0.75s ease-out forwards;
  }

  .iridescent-btn {
    position: relative;
    padding: 18px 52px;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.03em;
    color: rgba(255, 255, 255, 0.92);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.05) 30%,
        transparent 50%,
        rgba(255, 255, 255, 0.05) 70%,
        rgba(255, 255, 255, 0.12) 100%
      ),
      linear-gradient(
        105deg,
        #1a0a2e 0%,
        #2d1b4e 15%,
        #0d2a4a 30%,
        #1a3a5c 45%,
        #2d1b4e 55%,
        #4a1a6e 65%,
        #8b2252 75%,
        #c4614a 82%,
        #d4a845 88%,
        #a8d4b8 93%,
        #6b9fd4 97%,
        #2d1b4e 100%
      );
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.18),
      0 0 0 1.5px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.25),
      inset 0 -1px 0 rgba(0, 0, 0, 0.3),
      0 8px 32px rgba(0, 0, 0, 0.35),
      0 2px 8px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  .iridescent-btn::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 15%;
    width: 70%;
    height: 45%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.35) 0%,
      rgba(255, 255, 255, 0.08) 60%,
      transparent 100%
    );
    border-radius: 999px;
    pointer-events: none;
    z-index: 1;
  }

  .iridescent-btn::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 15%,
      rgba(255, 255, 255, 0.06) 30%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0.06) 70%,
      transparent 85%
    );
    transform: translateX(-160%);
    pointer-events: none;
    border-radius: 999px;
    z-index: 2;
  }

  @keyframes shimmerLoop {
    0% {
      transform: translateX(-160%);
    }
    100% {
      transform: translateX(160%);
    }
  }

  .iridescent-btn:hover::after {
    animation: shimmerLoop 1s linear infinite;
  }

  .iridescent-btn:hover {
   
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.22),
      0 0 0 1.5px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      inset 0 -1px 0 rgba(0, 0, 0, 0.3),
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 4px 12px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(100, 60, 180, 0.25),
      0 0 60px rgba(100, 60, 180, 0.12);
  }

  .iridescent-btn:active {
    transform: translateY(1px) scale(0.983);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.15),
      0 0 0 1.5px rgba(0, 0, 0, 0.5),
      inset 0 2px 6px rgba(0, 0, 0, 0.3),
      0 4px 16px rgba(0, 0, 0, 0.3);
  }

  .btn-text {
    position: relative;
    z-index: 3;
  }

  /* ══════════════════════════════════════════
     POKÉMON CARD INNER STYLES
  ══════════════════════════════════════════ */
  .icon-svg {
    width: 1em;
    height: 1em;
    display: inline-block;
    vertical-align: middle;
    fill: currentColor;
  }

  .card-container {
    position: relative;
    width: 345px;
    height: 480px;
    perspective: 1500px;
  }

  .hover-zone {
    position: absolute;
    width: 50%;
    height: 50%;
    z-index: 20;
  }
  .hover-zone.tl {
    top: 0;
    left: 0;
  }
  .hover-zone.tr {
    top: 0;
    right: 0;
  }
  .hover-zone.bl {
    bottom: 0;
    left: 0;
  }
  .hover-zone.br {
    bottom: 0;
    right: 0;
  }

  .playing-card {
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom right, #ffe76b, #cba922);
    border-radius: 18px;
    position: relative;
    padding: 12px;
    transform-style: preserve-3d;
    transition:
      transform 0.4s ease-out,
      box-shadow 0.4s ease-out;
    box-shadow:
      0 10px 20px rgba(0, 0, 0, 0.4),
      inset 0 0 0 2px rgba(255, 255, 255, 0.3);
  }

  .card-inner-content {
    background: radial-gradient(circle at center, #f4d742 20%, #f8d030 80%);
    height: 100%;
    width: 100%;
    border-radius: 6px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    color: #4a3a2f;
    position: relative;
    z-index: 2;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
    transform-style: preserve-3d;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 6px 10px 2px 10px;
  }

  .header-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .pokemon-name {
    font-weight: 800;
    font-size: 1.4rem;
    letter-spacing: -0.5px;
    line-height: 1;
  }

  .stage-label {
    font-size: 0.6rem;
    font-weight: bold;
    color: rgba(74, 58, 47, 0.7);
    text-transform: uppercase;
    margin-bottom: 2px;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 800;
    font-size: 1.3rem;
    color: #d32f2f;
  }

  .hp-label {
    font-size: 0.6rem;
    margin-right: 2px;
    color: #d32f2f;
  }

  .type-icon-header {
    width: 24px;
    height: 24px;
    background: #f8d030;
    border-radius: 50%;
    border: 1px solid #a38513;
    box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.8);
    display: grid;
    place-items: center;
    font-size: 14px;
    color: #4a3a2f;
  }

  .art-box {
    margin: 2px 10px;
    height: 160px;
    border: 3px solid #a68e59;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    background: transparent;
    transform-style: preserve-3d;
    transform: translateZ(0px);
  }

  .bg-clipper {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 0;
  }

  .parallax-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  .layer-sky {
    background: linear-gradient(to bottom, #5ca0d3, #c1e3ff);
    transform: scale(1.2);
  }

  .layer-grass {
    transform: translateZ(0);
  }

  .grass-shape {
    position: absolute;
    bottom: -30px;
    left: -10%;
    width: 120%;
    height: 70px;
    background: linear-gradient(to top, #388e3c, #6abf69);
    border-radius: 50% 50% 0 0;
    box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  .layer-pokemon {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateZ(50px);
    z-index: 2;
    filter: drop-shadow(0 25px 15px rgba(0, 0, 0, 0.5));
  }

  .main-svg-image {
    width: 75%;
    height: auto;
  }

  .info-strip {
    background: linear-gradient(to right, #cba922, #e6cd6b, #cba922);
    margin: 4px 8px;
    padding: 2px 5px;
    font-size: 0.6rem;
    font-style: italic;
    text-align: center;
    border-radius: 2px;
    border-top: 1px solid rgba(255, 255, 255, 0.4);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .attacks-container {
    flex-grow: 1;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
  }

  .attack-row {
    display: flex;
    align-items: center;
  }

  .energy-cost {
    display: flex;
    gap: 2px;
    width: 50px;
  }

  .energy-orb {
    width: 18px;
    height: 18px;
    background: #f8d030;
    border-radius: 50%;
    border: 1px solid #a38513;
    box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.9);
    display: grid;
    place-items: center;
    font-size: 10px;
    color: #4a3a2f;
  }

  .energy-orb.colorless {
    background: #e0e0e0;
    border: 1px solid #a0a0a0;
  }

  .energy-orb.fighting {
    background: #c07a50;
    border-color: #8b4513;
    color: white;
  }

  .attack-mid {
    flex-grow: 1;
    padding: 0 10px;
    text-align: left;
  }

  .attack-name {
    font-weight: 800;
    font-size: 1rem;
  }

  .attack-desc {
    font-size: 0.65rem;
    line-height: 1.1;
    margin-top: 2px;
    color: rgba(74, 58, 47, 0.9);
  }

  .attack-damage {
    font-weight: 800;
    font-size: 1.3rem;
  }

  .footer-stats {
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    background: rgba(0, 0, 0, 0.05);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 0.7rem;
    font-weight: bold;
  }

  .stat-box {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .bottom-metadata {
    padding: 4px 10px 8px 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 0.55rem;
    font-weight: bold;
    color: #4a3a2f;
  }

  .star-svg {
    fill: #4a3a2f;
    margin-left: 2px;
  }

  .pokemon-logo-svg {
    height: 16px;
    width: auto;
    fill: #ffcb05;
    stroke: #3c5aa6;
    stroke-width: 1px;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3));
  }

  .shimmer {
    position: absolute;
    inset: 0;
    z-index: 5;
    pointer-events: none;
    opacity: 0.3;
    background: linear-gradient(
        115deg,
        transparent 20%,
        rgba(255, 0, 0, 0.4) 30%,
        rgba(255, 255, 0, 0.4) 40%,
        rgba(0, 255, 0, 0.4) 50%,
        rgba(0, 255, 255, 0.4) 60%,
        rgba(0, 0, 255, 0.4) 70%,
        rgba(255, 0, 255, 0.4) 80%,
        transparent 90%
      ),
      radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px);
    background-size:
      200% 200%,
      3px 3px;
    background-position: 0% 0%;
    mix-blend-mode: color-dodge;
    border-radius: 18px;
    transition:
      background-position 0.4s ease,
      opacity 0.4s ease;
  }

  .hover-zone.tl:hover ~ .playing-card {
    transform: rotateX(15deg) rotateY(-18deg);
  }
  .hover-zone.tr:hover ~ .playing-card {
    transform: rotateX(15deg) rotateY(18deg);
  }
  .hover-zone.bl:hover ~ .playing-card {
    transform: rotateX(-15deg) rotateY(-18deg);
  }
  .hover-zone.br:hover ~ .playing-card {
    transform: rotateX(-15deg) rotateY(18deg);
  }

  .hover-zone.tl:hover ~ .playing-card .shimmer {
    background-position: 0% 0%;
    opacity: 0.7;
  }
  .hover-zone.tr:hover ~ .playing-card .shimmer {
    background-position: 100% 0%;
    opacity: 0.7;
  }
  .hover-zone.bl:hover ~ .playing-card .shimmer {
    background-position: 0% 100%;
    opacity: 0.7;
  }
  .hover-zone.br:hover ~ .playing-card .shimmer {
    background-position: 100% 100%;
    opacity: 0.7;
  }

  .hover-zone:hover ~ .playing-card {
    box-shadow:
      0 35px 60px rgba(0, 0, 0, 0.6),
      inset 0 0 0 2px rgba(255, 255, 255, 0.5);
  }

  /* ══════════════════════════════════════════
     DUCK CARD INNER STYLES
  ══════════════════════════════════════════ */
  .card {
    --bg-color: #1e1e24;
    --bg-gradient: linear-gradient(135deg, #1e1e24 0%, #2a2a35 100%);
    --duck-body: #f4f4f5;
    --duck-wing: #e4e4e7;
    --duck-beak: #ff3b30;
    --duck-feet: #ff9f0a;
    --duck-eye: #18181b;

    --base-speed: 1s;
    --turbo-speed: 0.3s;

    position: relative;
    width: 100%;
    max-width: 600px;
    height: 500px;
    background: var(--bg-gradient);
    border-radius: 24px;
    box-shadow:
      0 20px 50px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s ease;
  }



  .card:hover {
    --base-speed: var(--turbo-speed);
  }

  .card:hover .error-code {
    color: rgba(255, 255, 255, 0.1);
  }

  .card .error-container {
    text-align: center;
    z-index: 10;
    margin-bottom: 2rem;
    pointer-events: none;
  }

  .card .error-code {
    font-size: 10rem;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.05);
    line-height: 0.8;
    transition: color 0.3s ease;
    letter-spacing: -5px;
  }

  .card .error-msg {
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
    margin-top: -20px;
    margin-bottom: 2rem;
    letter-spacing: -0.5px;
  }

  .card .home-btn {
    pointer-events: auto;
    display: inline-block;
    padding: 14px 32px;
    background-color: #fff;
    color: #000;
    font-weight: 700;
    text-decoration: none;
    border-radius: 12px;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }

  .card .home-btn:hover {
    background-color: var(--duck-beak);
    color: white;
    transform: scale(1.05);
  }

  .card .duck__wrapper {
    display: grid;
    place-content: center;
    z-index: 5;
    transform: scale(0.85);
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .card:hover .duck__wrapper {
    transform: scale(0.85) rotate(5deg) translateX(20px);
  }

  .card .duck {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .card .duck__inner {
    display: flex;
    flex-direction: column;
    position: relative;
    animation: bird-up-down calc(var(--base-speed) / 2) linear infinite;
  }

  .card .duck__head {
    align-self: flex-end;
    width: 6rem;
    height: 4rem;
    border-radius: 8rem 8rem 0 0;
    background-color: var(--duck-body);
    position: relative;
    z-index: 1;
  }

  .card .duck__head::after,
  .card .duck__head::before {
    content: "";
    position: absolute;
    border-radius: 1rem;
    background-color: var(--duck-body);
    width: 0.4rem;
    height: 2rem;
    top: 0;
  }
  .card .duck__head::after {
    left: 44%;
    transform: translate(-50%, -50%) rotate(-30deg);
  }
  .card .duck__head::before {
    left: 45%;
    transform: translate(-50%, -50%) rotate(10deg);
  }

  .card .duck__white {
    position: absolute;
    top: 0.8rem;
    left: 0.8rem;
    width: 0.6rem;
    height: 1.3rem;
    transform: rotate(40deg);
    border-radius: 50%;
    border-left: 0.2rem solid rgba(255, 255, 255, 0.8);
  }

  .card .duck__eye {
    position: absolute;
    bottom: 0.2rem;
    right: 1rem;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background-color: var(--duck-eye);
    animation: eye-animation 2s infinite linear;
  }

  .card .duck__mouth {
    position: absolute;
    right: 0;
    top: 40%;
    width: 1rem;
    height: 1.2rem;
    transform: translate(90%, -50%);
    clip-path: polygon(0 0, 100% 40%, 100% 60%, 0% 100%);
    border-radius: 0 1rem 1rem 0;
    background-color: var(--duck-beak);
  }

  .card .duck__body {
    width: 9.5rem;
    height: 5rem;
    border-radius: 1rem 0 16rem 16rem;
    background-color: var(--duck-body);
    position: relative;
    overflow: hidden;
  }

  .card .duck__body::after {
    content: "";
    position: absolute;
    width: 105%;
    height: 200%;
    left: 50%;
    top: -95%;
    transform: translate(-50%, 0.02rem) rotate(-6deg);
    border-radius: 50%;
    border-bottom: 1rem solid #e4e4e7;
  }

  .card .duck__wing {
    position: absolute;
    left: 0.6rem;
    top: 55%;
    width: 4rem;
    height: 2.4rem;
    border-radius: 1rem 1rem 4rem 4rem;
    background-color: var(--duck-wing);
    transform: translate(0, -50%);
    transform-origin: right;
    animation: wing-animation var(--base-speed) linear infinite;
    z-index: 1;
  }

  .card .duck__foot {
    position: absolute;
    width: 0.6rem;
    height: 2rem;
    background-color: var(--duck-feet);
    z-index: -1;
  }

  .card .duck__foot::after {
    content: "";
    position: absolute;
    width: 2rem;
    height: 0.6rem;
    bottom: 0rem;
    left: -0.5rem;
    background-color: var(--duck-feet);
    border-radius: 1rem;
  }

  .card .duck__foot--1,
  .card .duck__foot--2 {
    left: 40%;
    bottom: 0;
    transform: translate(-50%, 80%);
  }

  .card .duck__foot--1 {
    animation: foot-ans var(--base-speed) linear infinite;
  }
  .card .duck__foot--2 {
    animation: foot-ans var(--base-speed) calc(var(--base-speed) / 2) linear
      infinite;
  }

  .card .surface {
    position: absolute;
    bottom: -1.9rem;
    left: 55%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.2);
    width: 8rem;
    height: 0.5rem;
    border-radius: 1rem;
    animation: surface-animation calc(var(--base-speed) / 2) linear infinite;
    filter: blur(2px);
  }

  .card .orb {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
    animation: orb-animation 8s linear infinite;
  }

  .card:hover .orb {
    width: 150px !important;
    height: 2px !important;
    border-radius: 2px;
    background-color: rgba(255, 255, 255, 0.2);
    animation-duration: 0.5s;
  }

  .card .orb--1 {
    top: 10%;
    width: 40px;
    height: 40px;
    animation-delay: 0s;
  }
  .card .orb--2 {
    top: 30%;
    width: 20px;
    height: 20px;
    animation-delay: -2s;
  }
  .card .orb--3 {
    top: 60%;
    width: 60px;
    height: 60px;
    animation-delay: -4s;
  }
  .card .orb--4 {
    top: 80%;
    width: 30px;
    height: 30px;
    animation-delay: -6s;
  }

  @keyframes surface-animation {
    0%,
    100% {
      transform: translateX(-50%) scaleX(0.9);
    }
    50% {
      transform: translateX(-50%) scaleX(1);
    }
  }

  @keyframes foot-ans {
    0% {
      transform: translate(-50%, 80%) rotate(0deg);
    }
    10% {
      transform: translate(-150%, 80%) rotate(10deg);
    }
    20% {
      transform: translate(-150%, 10%) rotate(10deg);
    }
    40% {
      transform: translate(400%, 10%) rotate(-20deg);
    }
    60% {
      transform: translate(600%, 60%) rotate(-20deg);
    }
    70% {
      transform: translate(500%, 60%) rotate(0deg);
    }
  }

  @keyframes bird-up-down {
    0%,
    100% {
      transform: translateY(0.4rem);
    }
    50% {
      transform: translateY(0rem);
    }
  }

  @keyframes wing-animation {
    0%,
    100% {
      transform: translate(0, -50%) rotate(16deg);
    }
    50% {
      transform: translate(0, -50%) rotate(-2deg);
    }
  }

  @keyframes eye-animation {
    0%,
    20% {
      transform: scaleY(1);
    }
    10% {
      transform: scaleY(0);
    }
  }

  @keyframes orb-animation {
    0% {
      transform: translateX(650px);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateX(-200px);
      opacity: 0;
    }
  }

  /* ══════════════════════════════════════════
     WEATHER CARD STYLES
  ══════════════════════════════════════════ */
  .weather-card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .weather-card-container .weather-card-main {
    transition-duration: 300ms;
    font-family: monospace;
    color: white;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #DCDFE4;
    width: 112px; /* w-28 */
    height: 192px; /* h-48 */
    border-radius: 1.5rem; /* rounded-3xl */
    padding: 1rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .dark-theme .weather-card-container .weather-card-main {
    background-color: #22272B;
  }

  .weather-card-container .weather-card-main:hover {
    width: 224px; /* hover:w-56 */
    background-color: #bfdbfe; /* hover:bg-blue-200 */
  }

  .dark-theme .weather-card-container .weather-card-main:hover {
    background-color: #0C66E4; /* hover:dark:bg-[#0C66E4] */
  }

  .weather-card-container h3 {
    font-size: 1.25rem; /* text-xl */
    text-align: center; /* text-center */
    margin: 0 0 1rem 0;
    color: white;
  }

  .weather-card-container .weather-icon-wrap {
    display: flex;
    gap: 1rem; /* gap-4 */
    position: relative; /* relative */
    justify-content: center;
    margin-top: 8px;
    height: 80px;
  }

  .weather-card-container .weather-svg {
    width: 80px; /* w-20 */
    transform: scale(1.1); /* scale-[110%] */
    transition: transform 0.3s ease;
  }

  .weather-card-container .weather-temp {
    font-family: sans-serif;
    transition-duration: 300ms;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 3rem; /* text-5xl */
    text-align: center;
    margin: 0;
    top: 50px;
    color: white;
    pointer-events: none;
  }

  .weather-card-container .weather-card-main:hover .weather-temp {
    transform: translate(32px, -64px) scale(1.5); /* group-hover:translate-x-8 group-hover:-translate-y-16 group-hover:scale-150 */
  }

  .weather-card-container .weather-details {
    position: absolute;
    transition-duration: 300ms;
    left: -128px; /* -left-32 */
    bottom: 20px;
    opacity: 0;
    color: white;
    width: 140px;
    text-align: left;
  }

  .weather-card-container .weather-card-main:hover .weather-details {
    left: 20px; /* group-hover:left-10 */
    opacity: 1;
  }

  .weather-card-container .weather-details p {
    font-size: 0.875rem; /* text-sm */
    margin: 0;
    line-height: 1.35;
    font-weight: 500;
  }

  /* ══════════════════════════════════════════
     PREMIUM FONT CARD STYLES
  ══════════════════════════════════════════ */
  .font-card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .font-card-container .card {
    width: 190px;
    height: 254px;
    background: #f5f5f5;
    padding: 15px;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s;
    position: relative;
  }

  .font-card-container .wrapper {
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .font-card-container .card-image {
    width: 100%;
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5em;
    font-weight: 900;
    transition: all 0.3s;
  }

  .font-card-container .content {
    height: fit-content;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .font-card-container .title {
    font-size: 0.72em;
    text-transform: uppercase;
    font-weight: 500;
    color: #4d4d4d;
  }

  .font-card-container .price {
    font-size: 1em;
    font-weight: 700;
  }

  .font-card-container .old-price {
    font-size: 0.7em;
    text-decoration: line-through;
    color: #adadad;
  }

  .font-card-container .card-btn {
    margin-top: 10px;
    width: 100%;
    height: 40px;
    background-color: rgb(24, 24, 24);
    border: none;
    border-radius: 40px;
    color: white;
    transition: all 0.3s;
    cursor: pointer;
    font-weight: 500;
  }

  .font-card-container .card:hover .card-image {
    height: 120px;
  }

  .font-card-container .card:hover .card-btn {
    margin-top: 0;
  }

  .font-card-container .card-btn:hover {
    background-color: greenyellow;
    color: rgb(35, 35, 35);
  }

  .font-card-container .card:hover {
    background-color: white;
  }

  .font-card-container .tag {
    position: absolute;
    background-color: greenyellow;
    color: rgb(0, 0, 0);
    left: 12px;
    top: 12px;
    padding: 6px 12px;
    border-radius: 15px;
    font-size: 0.75em;
    font-weight: 500;
  }

  /* ══════════════════════════════════════════
     ANIMATED FACE CANVAS STYLES
  ══════════════════════════════════════════ */
  .my-custom-face-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 380px;
    width: 100%;
    background: transparent;
    color: var(--text-primary, #1a1a1a);
  }

  .my-custom-face-container .face {
    width: 160px;
    transition: all 0.3s ease;
  }

  .my-custom-face-container .face__eyes,
  .my-custom-face-container .face__eye-lid,
  .my-custom-face-container .face__mouth-left,
  .my-custom-face-container .face__mouth-right,
  .my-custom-face-container .face__nose,
  .my-custom-face-container .face__pupil {
    animation: face-eyes 1s 0.3s forwards;
  }

  .my-custom-face-container .face__eye-lid,
  .my-custom-face-container .face__pupil {
    animation-duration: 4s;
    animation-delay: 1.3s;
    animation-iteration-count: infinite;
  }

  .my-custom-face-container .face__eye-lid {
    animation-name: face-eye-lid;
  }
  .my-custom-face-container .face__mouth-left {
    animation-name: face-mouth-left;
  }
  .my-custom-face-container .face__mouth-right {
    animation-name: face-mouth-right;
  }
  .my-custom-face-container .face__nose {
    animation-name: face-nose;
  }
  .my-custom-face-container .face__pupil {
    animation-name: face-pupil;
  }

  @keyframes face-eye-lid {
    0%,
    40%,
    45%,
    100% {
      transform: translateY(0);
    }
    42.5% {
      transform: translateY(17.5px);
    }
  }

  @keyframes face-eyes {
    from {
      transform: translateY(112.5px);
    }
    to {
      transform: translateY(15px);
    }
  }

  @keyframes face-pupil {
    0%,
    37.5%,
    40%,
    45%,
    87.5%,
    100% {
      stroke-dashoffset: 0;
      transform: translate(0, 0);
    }
    12.5%,
    25%,
    62.5%,
    75% {
      transform: translate(-35px, 0);
    }
    42.5% {
      stroke-dashoffset: 35;
      transform: translate(0, 17.5px);
    }
  }

  @keyframes face-mouth-left {
    from,
    50% {
      stroke-dashoffset: -102;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes face-mouth-right {
    from,
    50% {
      stroke-dashoffset: 102;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes face-nose {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(0, 22.5px);
    }
  }

  /* ── Aether Toast Notification ── */

  .aether-toast-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .aether-toast {
    --color-ink: #1d1d1f;
    --color-ink-inverse: #f5f5f7;
    --color-ink-secondary: #54545a;
    --color-ink-tertiary: #86868b;
    --color-success: #34c759;
    --color-surface-glass-strong: rgba(255, 255, 255, 0.75);
    --color-hairline: rgba(15, 23, 42, 0.08);
    --color-bevel-light: rgba(255, 255, 255, 0.9);
    --color-bevel-soft: rgba(255, 255, 255, 0.55);
    --glass-bevel-inset: inset 1.5px 1.5px 0 0 var(--color-bevel-light),
      inset -1px -1px 0 0 var(--color-bevel-soft),
      inset 0 0 0 1px rgba(15, 23, 42, 0.04);
    --glass-shadow-raised: 0 2px 4px rgba(15, 23, 42, 0.06),
      0 22px 44px -14px rgba(15, 23, 42, 0.22);
    --glass-blur: blur(20px) saturate(180%);
    --dur-med: 220ms;
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    max-width: 420px;
    width: 100%;
    padding: 14px 16px;
    border-radius: 16px;
    background: var(--color-surface-glass-strong);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    box-shadow: var(--glass-bevel-inset), var(--glass-shadow-raised);
    border: 1px solid var(--color-hairline);
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif;
    animation: toast-slide-in 0.5s var(--ease-out-expo) both;
  }

  .dark-theme .aether-toast,
  [data-theme="dark"] .aether-toast {
    --color-ink: #f5f5f7;
    --color-ink-inverse: #1d1d1f;
    --color-ink-secondary: #a1a1a6;
    --color-ink-tertiary: #6e6e73;
    --color-surface-glass-strong: rgba(44, 44, 46, 0.72);
    --color-hairline: rgba(255, 255, 255, 0.08);
    --color-bevel-light: rgba(255, 255, 255, 0.06);
    --color-bevel-soft: rgba(255, 255, 255, 0.03);
  }

  .aether-toast__icon {
    flex-shrink: 0;
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(52, 199, 89, 0.12);
    color: var(--color-success);
  }

  .aether-toast__content {
    flex: 1;
    min-width: 0;
  }

  .aether-toast__title {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.38;
    color: var(--color-ink);
    letter-spacing: -0.01em;
  }

  .aether-toast__message {
    margin: 2px 0 0;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.42;
    color: var(--color-ink-secondary);
    letter-spacing: 0.01em;
  }

  .aether-toast__meta {
    flex-shrink: 0;
    align-self: center;
    padding: 2px 8px;
    border-radius: 6px;
    background: rgba(15, 23, 42, 0.05);
    font-size: 11px;
    font-weight: 600;
    color: var(--color-ink-tertiary);
    letter-spacing: 0.02em;
  }

  .aether-toast__close {
    flex-shrink: 0;
    align-self: flex-start;
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--color-ink-tertiary);
    cursor: pointer;
    transition: background var(--dur-med) ease, color var(--dur-med) ease;
  }

  .aether-toast__close:hover {
    background: rgba(15, 23, 42, 0.06);
    color: var(--color-ink);
  }

  .aether-toast__close:active {
    transform: scale(0.92);
  }

  @keyframes toast-slide-in {
    from {
      opacity: 0;
      transform: translateY(16px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;
