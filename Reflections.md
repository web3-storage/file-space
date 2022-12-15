## A few things it would be useful to have 
- Ability to add metadata to an Upload. Something along the lines of https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingMetadata.html

- Ability to get the Upload size, while this is not trivial and really depends on how the file is serialised etc, it's quite important info to have. (could just be the dag_size?)

- On a related note, an api to fetch upload data (https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html)

- Expose delete apis in w3ui providers

- Add APIs to batch delete files

## TODO
- Implement delete and batch delete
- Implement "Add to my account"
- Have a direct download intead of sending the user to the gateaway. (can be achieved with `?format=tar&download=true` if supported by gateaway)
gst
