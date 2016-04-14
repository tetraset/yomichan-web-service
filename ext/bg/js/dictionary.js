/*
 * Copyright (C) 2016  Alex Yatskov <alex@foosoft.net>
 * Author: Alex Yatskov <alex@foosoft.net>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


class Dictionary {
    constructor() {
        this.termDicts  = {};
        this.kanjiDicts = {};
    }

    addTermDict(name, dict) {
        this.termDicts[name] = dict;
    }

    addKanjiDict(name, dict) {
        this.kanjiDicts[name] = dict;
    }

    findTerm(term) {
        let results = [];

        for (const name in this.termDicts) {
            const dict    = this.termDicts[name];
            const indices = dict.indices[term] || [];

            results = results.concat(
                indices.map(index => {
                    const [e, r, t, ...g] = dict.defs[index];
                    return {id: index, expression: e, reading: r, glossary: g, tags: t.split(' ')};
                })
            );
        }

        return results;
    }

    findKanji(kanji) {
        const results = [];

        for (const name in this.termDicts) {
            const def = this.termDicts[name][kanji];
            if (def) {
                const [c, k, o, g] = def;
                results.push({id: index, character: c, kunyomi: k, onyomi: o, glossary: g});
            }
        }

        return results;
    }
}