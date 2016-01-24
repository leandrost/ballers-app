import I18n from 'react-native-i18n';

export function T (defaultScope) {
  return function (scope, options) {
    options = options || {};
    options.scope = defaultScope;
    return I18n.t(scope, options);
  }
}

I18n.fallbacks = true;
I18n.translations = {
  'en': {
    screens: {
      courts: {
        title: 'Courts',
        noCourtsFound: 'Ooop! no courts found!'
      },
      newCourt: {
        title: 'New Court',
        courtName: 'Court Name',
        location: 'Location',
        schedule: 'Schedule',
        endTime: 'End Time',
        addSchedule: 'Add Schedule',
      },
    },
  },
  'pt-BR': {
    screens: {
      courts: {
        title: 'Quadras',
        noCourtsFound: 'Ooop! Nenhuma quadra foi encontrada',
      },
      newCourt: {
        title: 'Nova Quadra',
        courtName: 'Nome da quadra',
        location: 'Local',
        schedule: 'Horários',
        endTime: 'Término',
        addSchedule: 'Adiciona Horário',
      },
    },
  },
}
