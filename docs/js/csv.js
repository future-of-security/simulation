// Shared CSV reader for the simulation-data files.
//
// These files are hand-edited and their description columns carry commas,
// quotes and the occasional newline, so a split(',') loses rows silently.
// This is RFC 4180: quoted fields, "" escapes, newlines inside quotes.
//
// Loaded by both the dashboard (js/app.js) and the response builder, so the
// two cannot disagree about what a row says.
(function (global) {
  'use strict';

  function splitCSVRecords(text) {
    const records = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '"') {
        if (inQuotes && text[i + 1] === '"') { current += '""'; i++; continue; }
        inQuotes = !inQuotes;
        current += char;
      } else if ((char === '\n' || char === '\r') && !inQuotes) {
        if (char === '\r' && text[i + 1] === '\n') i++;
        records.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    if (current) records.push(current);
    return records;
  }

  function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  }

  // Header row -> array of plain objects, every value trimmed.
  function parseCSVRows(text) {
    const lines = splitCSVRecords(text).filter(l => l.trim());
    if (lines.length < 2) return [];
    const headers = parseCSVLine(lines[0]).map(h => h.trim());
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const row = {};
      headers.forEach((h, idx) => row[h] = (values[idx] || '').trim());
      rows.push(row);
    }
    return rows;
  }

  global.SimCSV = { splitCSVRecords, parseCSVLine, parseCSVRows };
})(typeof globalThis !== 'undefined' ? globalThis : window);
