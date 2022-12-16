## A few things it would be useful to have 
- Ability to add metadata to an Upload. Something along the lines of https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingMetadata.html

- Ability to get the Upload size, while this is not trivial and really depends on how the file is serialised etc, it's quite important info to have. (could just be the dag_size?)

- On a related note, an api to fetch a single upload metadata (the same you would get for an item in the list api) (https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html)

- Expose delete apis in w3ui providers

- Add APIs to batch delete files


## Questions

### Multiple agents.
What are the best practices for a FE only app that could be used on different devices.
Here's the scenarion:
User, signs up from **DeviceA**. `AgentA` and `SpaceA` (name="FilesSpace") are created.

Now it logs from **DeviceB**, the expectations is to be able to use the same `SpaceA` from there.

How can this behavior be achieved in a FE only app?
One way would be to have a "link feature" (think for instance WhatsApp link device) where basically AgentA could delegate access to `AgentB` leveraging
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
and
```
importSpaceFromDelegation
```

But what if DevicesA is lost, or the Agent keys are gone?
Are there ways to create Agents that have "account" like capabilities?
What are the best practices in this case?

In client/server kind of situation, would the server create an Agent per user and delegate access to the different client agents? 

## TODO
- Implement batch delete
- Implement multi device capabilities 
- Implement "Add to my account" (instead of downloading)
- Have a direct download intead of sending the user to the gateaway. (can be achieved with `?format=tar&download=true` if supported by gateaway)
