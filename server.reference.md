### Setting RCL
- storage.db['rooms.objects'].update({ _id: 'idOfController' },{ $set: { level: 8 }})
- 1bc30772347c388
- storage.db['rooms.objects'].update({ _id: '1bc30772347c388' },{ $set: { level: 7 }})

### Complete all construction projects
storage.db['rooms.objects'].update({ type: 'constructionSite' },{ $set: { progress: 99999 }})