## A few things it would be useful to have 
- Ability to add metadata to an Upload. Something along the lines of https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingMetadata.html

- Ability to get the Upload size, while this is not trivial and really depends on how the file is serialised etc, it's quite important info to have. (could just be the dag_size?)

- On a related note, an api to fetch upload data (https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html)

- Expose delete apis in w3ui providers

- Add APIs to batch delete files


## Questions

### Multiple agents.
We couldn't quite figure out how to hadle a scenario where UserA logs in from DeviceA. 
Creating an AgentA and SpaceA (name="FilesSoace").
Now it logs from DeviceB, the expectations is to be able to use the same SpaceA, from there.

How can this behavior be achieved in a FE only app?
One way would be to have a "link feature" where basically AgentA could delegate access to AgentB leveraging
```
const delegation = await agent.delegate({
  audience: 'did:key:kAgentToDelegateTo',
  abilities: [
    {
      can: 'space/info',
      with: agent.currentSpace()
    }
  ]
})
```

But what if DevicesA is lost, or the Agent keys are gone?
Are there ways to create Agents that have "account" like capabilities?


In client/server kind of situation, would the server create an Agent per user and delegate access to the different client agents? 


## TODO
- Implement delete and batch delete
- Implement "Add to my account"
- Have a direct download intead of sending the user to the gateaway. (can be achieved with `?format=tar&download=true` if supported by gateaway)
gst
