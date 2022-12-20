const users = [
    {id: 1, pref: {do: 'fixing', learn: 'baking'}},
    {id: 2, pref: {do: 'homework', learn: 'baking'}},
    {id: 3, pref: {do: 'homework', learn: 'math'}},
    {id: 4, pref: {do: 'trade', learn: 'programming'}},
]

const process = (input) => {
    const prefsMap = {};

    const result = {users: [], defaultPrefs: {}};

    if (!input?.length) {
        return result;
    }

    for (let i = 0; i < input.length; i++) {
        const pref = input[i].pref
        for (let key in pref) {
            if (pref.hasOwnProperty(key)) {
                const prefValue = pref[key];
                if (!prefsMap.hasOwnProperty(key)) {
                    prefsMap[key] = {[prefValue]: 0, defaultPref: prefValue};
                }

                prefsMap[key][prefValue] = prefsMap[key][prefValue] != null ? prefsMap[key][prefValue]+1 : 1;

                if (prefsMap[key][prefValue] > prefsMap[key][prefsMap[key].defaultPref]) {
                    prefsMap[key].defaultPref = prefValue;
                }
            }
        }
    }

    for (let i=0;i<input.length;i++) {
        const user = input[i];
        const userObj = { id: user.id, prefs: {}};
        const pref = user.pref;
        for (let key in pref) {
            if(pref[key] !== prefsMap[key].defaultPref) {
                userObj.prefs[key] = pref[key];
            }
        }

        result.users.push(userObj);
    }

    for(let defaultPref in prefsMap) {
        result.defaultPrefs[defaultPref] = prefsMap[defaultPref].defaultPref;
    }

    return result;
}

const taskResult = process(users);

console.log(taskResult);