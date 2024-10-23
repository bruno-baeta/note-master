// Definindo a interface para o objeto de cores
interface Colors {
  primary: string;
  primaryAlt: string;
  secondary: string;
  textWhite: string;
  background: string;
  buttonBackground: string;
  buttonHover: string;
}

// Definindo a interface para o objeto de fontes
interface Fonts {
  primary: string;
}

// Definindo a interface para o objeto de tamanhos de fonte
interface FontSizes {
  large: string;
  mediumAlt: string;
  medium: string;
  small: string;
}

// Definindo a interface para outros tamanhos (como avatares e botões)
interface Sizes {
  avatarSize: string;
  buttonPadding: string;
}

// Exportando as cores com os tipos definidos
export const colors: Colors = {
  primary: '#4285F4',
  primaryAlt: '#4285F4',
  secondary: '#2B2E30',
  textWhite: '#FFFFFF',
  background: '#1B1D1E',
  buttonBackground: '#292D2E',
  buttonHover: '#2A303A',
};

// Exportando as fontes com os tipos definidos
export const fonts: Fonts = {
  primary: "'Poppins', sans-serif",
};

// Exportando os tamanhos de fonte com os tipos definidos
export const fontSizes: FontSizes = {
  large: '32px',
  mediumAlt: '18px',
  medium: '14px',
  small: '12px',
};

// Exportando outros tamanhos com os tipos definidos
export const sizes: Sizes = {
  avatarSize: '40px',
  buttonPadding: '10px 20px',
};
