import { normalizeStructTag } from "@mysten/sui.js/utils";

const SUI_COINTYPE = "0x2::sui::SUI";
const USDC_ET_COINTYPE =
  "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN";
const USDT_ET_COINTYPE =
  "0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN";

export const NORMALIZED_SUI_COINTYPE = normalizeStructTag(SUI_COINTYPE);
export const NORMALIZED_USDC_ET_COINTYPE = normalizeStructTag(USDC_ET_COINTYPE);
export const NORMALIZED_USDT_ET_COINTYPE = normalizeStructTag(USDT_ET_COINTYPE);

// 128x128
export const LOGO_MAP = {
  [NORMALIZED_SUI_COINTYPE]:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA43SURBVHgB7Z1NbFTXFcfPfeN0UZDqZgHdtAxk00pQjJQqbbKISapuisF01TThS6LbAsuGhfGibLHXTcWHW5Edw1cXQQGziYgUCbeN1G5iT0QXhQU4rdk0M+/l/N/MMzPjeffeN+/r3PH8pME2M2PPzDn33P8599z7FA0h0xeDanOMJiigKnm0w/Np3Ff8PX5uUY15aj1QtKqIVgk3RXXy6cuKoiX+Pau1d9USDRmKHCc0doUm2UB7g4AmVcvI45QPcIql8BbQ/coYLdXeUXVyGOccYPpaME5rNNFUdIhH5zTFj+ZC4IixpPhWCehy7YhaJMdwxgGmF4JJHuHHfAqNntcIT8sqR6IaR4frN4+oGjmAaAfg8D7hj9EhNvxpkmv0OOrsDIuVCs1KniZEOgBGe5NohkfSJA0Dih2B2BEEThGiHGDoDL+ROt9mbx5Vl0gIIhxgExi+lzoJcYRSHWD6KqdwDbq4iQzfjaIap5JnytQIpTgAUjl/jU6xuDtHI4jTyHPeVpqvHVarVDCFO0AY7gMe9SXn7wKpc8XxRNFCsTAHCEf9/2gmoDClGxGHR3M331NnqCAKcYBwrv+a7tFo1NtSr7xE+4vQBh7lzMHLwTE2/kMaGT8JGDAPp64EuUfLXCPAwSvBhVHITwcE4o0japZyIhcHwHzfXAvTu2kakR6ki1tZIOaQJWTuAJjvGw26xsuyEzQiS3LRBZk6wEjs5U7mTpCZA4yMXxiZOkEmDjAyfuFk5gSpHWBk/NLIxAlS1QFCtT8yflmEYjtskUtBKgcIU72R8UsDmVbbBgMzsAMcWAhmRnm+ANgGU38OLtCADKQBDi4EWMqdoxFiUB4dv/GeukwJSewAbdGH2r5rTZpdbHmJaP5A6/tTt4me/59cZ5VF4b6kojDxFNAWfU4bH5x6g2jb1tbt/UkaBkJBnlQUJnIALO7QEIi+d/YS/fT7L37es731f0NAtfmcZpI8wXoKaHfy3CPHeesVXp58vf99858QffwFOU9FcX3AsrPIKgKE+X6QLt2QwLYtRL99Nf7+k3zf9i3kPLCV7VRg5QCNNTpFjod+GP/8L1j8fSv+MbjvD4bHOELV/69dH4ZxCmir/hVyHAi9znlfxz8eE539iJyHs4KdpqzAGAHY+AMXGaTQK/pMQBSefJWcJ9xzYUDrAFNXguNEblf7Dv6IHeDHlBg87+1XyG0CmoR41z3EFAESpRTSwLw/iPEjEAV2fZecpmmwYawDtEd/lRzFRvSZwHOhHZwWhYYooIsATo/+0+1KXxxP1jglvMaj/Frr+ziGoVKoiwJ9HeBAy2Oq5CgQfbu3x9+Puv/ZO0SP11rGf/+Ofi3AeVGoiQJ9HUA5PPptRN/cJy3jR8AJzi+afy9urhIXBTY4APJ+V7drY943jdSrfyP69NHG/0fuj/t0wLGcFYWIAn8JNrTqb3CAZtPN0R+JPh0P2PBX/x5/P+7TrQVEotDVcrHf2JjSb5wCfDdHPwxjEn1/+oyMfPCZWRT+7g1ykkCFJf0uuhxgaiEo/dy9QYDo2/Wy/jEY3Y/XyAjE4BCLwvFeMdgdAXD4omPYiL7P/5NsmXeYRSHOWuz8ucsBVNOtsi8Emc1I/HiZEmMjCl2sFOKgzc6l4nUHQO7Pc4QzrV4QfTYFGozmQZs8TKIQOCgKw6N2ox/WHUCp7tAgHZPoi3jwiFIBUbj8LP5+vIbf7yenaHQs8L1wAIe2c5/8iVn0RXya0gEgBs8v6kWh7VQkBbb1utYLHQDFn8ARBwjF1w/tH4+5PC1DKAqrOGYf34QO0Gy4YfykIw3qPyvgSB8Y6gguicLwGgvUdgDlQPHHVvR1svY1ZcqNf7ZuOlwRhSz4w0EfOkDgkfiueJR5bURfJ08sCj9JQWZgIwql9xCw4d9sfw0jgOgpAKIvqfFBHtu9IlGocy5MA2k6kYogaF8/ycMKkeT8H2XeJKKvk+0DOI0NMD42kehwQBSOQwh6DV+u8dP29OXJMIhCXFnNk5z/m5Z3Ich0oVjXFZQFtqJQrB7gacBTgczVP4R+0/KuTZUu7w/fRhQOOoXlDU/9VY8zgB0kDFPoh/HR0wdMuX7eH76NKIQWkJgaVgL6DrIAcRrAtFV7vqOnb+WZ/rFFbO4wiUJEoV8LTLRxNVVPCXMAjH6d0bA611nexfe6dC8MwQWocbwOnR7AexIXBaABOB8U5QC60Y+R9mGfnj6TEMN0UsSHDz2gc8a3BG41wxRQJUHs0Sh3jP5+bV03/qX/4BGCi1iyxWvQOSMikbCMoJr7BSOSgBESp/zx4d5djr/PFAWQj596nXJH54wwvrS6gCgH0I1+NHbomjpNUQBgHs7bCfAadF1E0nYci3IA3R7+u4bWLHzwup7/CBhg7kC+mkDXhPJagnMKikCMAyA0xs2PEH82jR2YBmz6//C3cBTMnpwqhbrMBO9xp6BpQIwD6Mq2y4ZcvxPTxo4IaA04QV4HQ+l6EffkXKJOAhygTgLQlX2TdPZEGztsewGgzOEIWc/NK0/j79uW0yrlANTlTAGaJs+VBBEARFu+bZ0ABoE4nPtldtHgyXPS/j0JKEWrHikZEQBn98YxSGdPUicAcMI//iqbU0N105aUVDAgdgDl05ckAN2oeKwZTTpgfBwEnXRjCCqHaXv7TIUpEfj0FaaAwq9Y3Y+8PhQYAgs1pm1evSAlhTYY1AlccABeCa57gZApIG9QIzCdB9QLohJqBq6fFBaHCiACN4kDABgfToAjYmwdAaMVTuD8mYF9qCha8ioNWiIB6EJm1nk6qooQiEm0AbKEJPm7TtOIuThFg0Vg7YSqcygoXQfoPpRv5zBnRk0cOBPYNhokEYa6xwlxgFW2/VKrDuCVPw3o8uY8K2co2yIa2OwiTnKauK7cm8eGlcSoVuRvOYBP96lkdCt9tjuBByXa/GmTKURFIxM7Na95OWFhKw+4BhC+29bWMFW+DtCVTncXVDtHpmDjBEgRTaeP66KWhAigiBbxNXSASrP1Q5l8rlntw6jbI8wJEAXipgKkjToRuCIgAkTiP3QACEEqeVEIYVEnjnYXuIJm4wQwflzL+ZSmCRXvMYszC9LAawBLbZt3nRBynUpG98EU3U8HJzAZKu416aJV2cYHQfBiyl93AN+jGpWMTonrRlxeIE00lXTf3tX9f7q+RpD2yJos4ALQ+hVG1x1gjOeEsusB+HB0H3jRUQBizdRs+toPun/+jWZHE97bg/IdYLXzknLrDsBzAoxf6jRgaqgsIwqYmk0R7iOnNO1nfPBIRBGoK9J3NYTwNHCJSuau4VDH8FjYAhdnTE4JQtVvsZX9Q4um1dxR3YO8ywFucWgoexpYfmoWSkVvuTbN28hQTFvZ4za1FAnn/vWbR1R8BAA+ax8qGdPpG0VfxsVUuTOFfiBh9Ae0sd6zwQHG/PKzARvxhbm3iJ0+ANNAmuod3kvZox9wwW+29/82OABWiDhWLFLJIA83fehF7PSJeJKiLe2qjLl/MSr+dNK3K5hDxSyVTNTKZaKInT5pOH9fxvJvJcamfR0AYlBCFLA5sh1EO32kde3gtS8/pdKB+Iu7nHzsvgAJUQDYHNkOomVa3CREA8z7IkI/6W2pvXr41EJwT8oVxJI2Z8Jp7n6RvvYOsYkKZJJNnRj1p2+TCDD6bxxVOzX3x4OLSHBd4B4JIOrGSVoEgghDBQ65vI0zYIMKGlB2f681pWxLGE1g/LN3BPX9EZ24eVRdirtT6wBAUhQACPFp5vqVZ/3TunDX7svJDd4Jog42p4oxvqIaF34O6x4yRgYqDTrRrNAKCWG+3dI96Pat9V69jPsLIPikzPkRbLszpscYN4cid+T1YxGCMAIf9PlFGa1V4ZmFH8kzPk/ds/3y/l6MESB8kE9zfoWOBYIOlMK8jhItFmDKSv8ipS9ovg+B8PPYZpaPtUOSIOwFKeDpn7WEWxHgvAKbjqGyCBTtvxWT9/di7QDgwOVgTvW5/KgUkLKhIyeviCDd8ICNP8/GP237+EQOMH0xGOep4KGkqaAfiAhYov35rvRRAUZ/8O+WwpcW6nsx5fwxz0kGLjLge+wEjlxkMjqbDw4RHUQFB+ldvoWYg4GxP2F5tf31mXyjRygc9tCkfTbCr+d5yZm6EhznLxdphBh8ojO3jyor4dfJQGcEobLEqWHpjSMjWiDlG8T44XMpBRwJrhG5dcHpIaTGA/IwDUiqU8IqTTqhBOwr3KxA9MEGlIJUDoBWcq9Bh5WQswY3E2Gxp0n72+38aX5PesLMoEL3pKeHw0KH8euUkkwcAIycoBiyNH7792XHyAnyJWvjg0yPisULwwscaYLsgdjO2vgg87OC206wj6j8/QVDRI3FdubGB5lOAb3w4tE59twZGjEwSRd3kpLraeG3jqlz/OWMhGPoXAO1feIcP0/jt/9O/ozEYTLyEHuav1Uc0vsJJICQP9agc2kLPLYU6gAAnUVeQBdH0aAbjHpfhSF/kQqk8CuG4A0iS5DWaFom+CzwmRRtfFB4BOgE2qBZoQu0WVcUFS2i7b6IuT7+JQgADSb8QmY2zbTAhsd+vTJG/MaXIoihdwRBho8Q5QARYQs6O4KkLWmpEGj4CJEOEBFqBI9QTXzTtaiAQo4f0Lw/RrW/vqvENs2IdoBOphaCafJpmp3hEDuDyI5kGJ1vtaaiyxJHez+ccYBOwinCp+PKo72cQk1QuWDv5HVOqGs4bbWoAk5WOOkAnYTTxBhNBD5NwiF43WEirwgR1ucVF2x8uo/lWRyzX2YKlwXOO0A/2CkmGmM0HjpDQFU21g5+p+P8Zsf5ZzhHNeap9fBfhevpUb0Z0FcKV1XjW6Xx4oj1YeIbu2p7Yb/eUoQAAAAASUVORK5CYII=",
  [NORMALIZED_USDC_ET_COINTYPE]:
    "data:image/png;base64,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",
  [NORMALIZED_USDT_ET_COINTYPE]:
    "data:image/png;base64,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",
  ETH: "data:image/png;base64,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",
  WORMHOLE:
    "data:image/png;base64,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",
};

export const extractSymbolFromCoinType = (coinType: string) =>
  coinType.split("::").at(-1);

export const isSui = (coinType: string) =>
  normalizeStructTag(coinType) === NORMALIZED_SUI_COINTYPE;
