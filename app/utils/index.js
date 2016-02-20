import I18n from 'react-native-i18n';
import {
  MKColor,
  setTheme,
} from 'react-native-material-kit';

export const Colors = {
  Primary: "#292929",
  RGBPrimary: "41,41,41",
  Accent: "#259b23",
  RGBAccent: "37,155,35",
  LightGray: "#ccc",
}

setTheme({
  primaryColor: Colors.Primary,
  RGBPrimaryColor: Colors.RGBPrimary,
  accentColor: Colors.Accent,
  RGBAccentColor: Colors.RGBAccent,
  bgPlain: 'rgba(158,158,158,.2)',
  bgDisabled: 'rgba(0,0,0,.12)',
  fontColor: 'rgb(117, 117, 117)',
  fontSize: 14,
  rippleColor: 'rgba(255,255,255,0.125)',
  toggleStyle: {
    onColor: `rgba(${Colors.RGBAccent},.4)`,
    offColor: 'rgba(0,0,0,0.25)',
    thumbOnColor: Colors.Accent,
    thumbOffColor: MKColor.Silver,
    rippleColor: `rgba(${Colors.RGBAccent},.2)`,
  },
  radioStyle: {
    borderOnColor: Colors.Primary,
    borderOffColor: Colors.Primary,
    fillColor: Colors.Primary,
    rippleColor: `rgba(${Colors.RGBPrimary},.2)`,
  },
  checkboxStyle: {
    borderOnColor: Colors.Accent,
    borderOffColor: 'rgba(0,0,0,.56)',
    fillColor: Colors.Accent,
    rippleColor: `rgba(${Colors.RGBAccent},.2)`,
    inset: 0,
  },
});



export function T (defaultScope) {
  return function t(scope, options) {
    options = options || {};
    if (scope[0] === ".") {
      scope = scope.replace(".", "");
      options.scope = defaultScope;
    }
    return I18n.t(scope, options);
  }
}

I18n.fallbacks = true;
I18n.translations = {
  'en': {
    date: {
      abbr_day_names: ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"],
    },
    done: "Done",

    screens: {
      courts: {
        title: 'Courts',
        noCourtsFound: 'Ooop! no courts found!'
      },
      location: {
        title: 'Location',
      },
      newCourt: {
        title: 'New Court',
        courtName: 'Court Name',
        location: 'Location',
        schedule: 'Schedule',
        endTime: 'End Time',
        addSchedule: 'Add Schedule',
        searchPlace: "Search a Place"
      },
      schedule: {
        title: 'Schedule',
        endTime: 'End Time',
        from: "From",
        to: "to",
        weekly: "Weekly",
        monthly: "Monthly",
        oneTime: "One Time Event",
      },
    },
  },
  'pt-BR': {
    date: {
      abbr_day_names: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    },
    done: "Feito",

    screens: {
      courts: {
        title: 'Quadras',
        noCourtsFound: 'Ooop! Nenhuma quadra foi encontrada',
      },
      location: {
        title: 'Local',
      },
      newCourt: {
        title: 'Nova Quadra',
        courtName: 'Nome da quadra',
        location: 'Local',
        schedule: 'Horários',
        endTime: 'Término',
        addSchedule: 'Adiciona Horário',
        searchPlace: "Buscar Local"
      },
      schedule: {
        title: 'Horário',
        endTime: 'Término',
        from: "De",
        to: "as",
        weekly: "Semanalmente",
        monthly: "Mensalmente",
        oneTime: "Evento Único",
      },
    },
  },
}
