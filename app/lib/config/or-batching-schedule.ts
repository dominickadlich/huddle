type BatchingDay = { batching: string; short_dated: string };

// 0 = Sunday ... 6 = Saturday
export const OR_BATCHING_SCHEDULE: Record<number, BatchingDay> = {
    1: {
        batching: [
            'Nitroglycerin 100 mcg/mL 10 mL Vials',
            'Heparin 10,000 units in NS 500 mL',
            'Aminocaproic Acid 12.5 g in 250 mL NS',
        ].join('\n'),
        short_dated: 'Nitroglycerin 2000 mcg/10 mL Syringes (Day)',
    },
    2: {
        batching: [
            'Cardioplegia Low',
            'Cefazolin 10 g/150 mL NS',
            'Adenocaine Syringes',
            'Heparin 10,000 units in Plasmalyte-A 500 mL Bags (OR Assignment 2)',
        ].join('\n'),
        short_dated: [
            'Aminocaproic Acid 12.5 g in 250 mL NS',
            'Heparin 10,000 units in Plasmalyte-A 500 mL Bags (OR Assignment 2)',
            'Cardioplegia Low',
            'Cefazolin 10 g/150 mL NS',
            'Adenocaine Syringes',
        ].join('\n'),
    },
    3: {
        batching: [
            'Insulin Regular 1 unit/mL (10 mL) Syringes',
            'Nicardipine 100 mcg/mL 10 mL Vials',
        ].join('\n'),
        short_dated: 'Nitroglycerin 100 mcg/mL 10 mL Vials (Day)',
    },
    4: {
        batching: [
            'Bupivacaine 0.0625% PF Syringes',
            'Nitroglycerin 200 mcg/10 mL Syringe',
            'Aminocaproic Acid 12.5 g in 250 mL NS',
        ].join('\n'),
        short_dated: 'Nicardipine 100 mcg/mL 10 mL Vial (2nd Shift)',
    },
    5: {
        batching: 'Cardioplegia High',
        short_dated: [
            'Bupivacaine 0.0625% 50 mL Syringes',
            'Cardioplegia High',
            'Acetylcholine Chloride 20 mg/1 mL 10 mL Syringe',
            'Insulin Regular 1 unit/mL 10 mL Syringe',
            'Aminocaproic Acid 12.5 g in 250 mL NS',
        ].join('\n'),
    },
    0: { batching: '', short_dated: '' },
    6: { batching: '', short_dated: '' },
};