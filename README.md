# sample-file-generator

Simple NodeJS app to auto-generate potentially thousands of sample documents.

This was put together to stress test integrations with cloud storage systems like (Dropbox, etc).

![alt text](https://raw.githubusercontent.com/njcaruso/sample-file-generator/master/documentation/output.png)

# Running

Change configuration settings in `app\config.json`:

```
{
  "levels": 2,
  "folders-per-level": 10,
  "files-per-folder": 12
}
```

In the above example, if:

levels = 1 => = 10 * ((10 * 12) + 12) = 1,320 samples

levels = 2 => = 10 * (10 * ((10 * 12) + 12)) + 12 = 13,212 samples

Then `npm run start`

# Development

All code was written in Typescript, although the code in `\generator` was ported from existing javascript samples
