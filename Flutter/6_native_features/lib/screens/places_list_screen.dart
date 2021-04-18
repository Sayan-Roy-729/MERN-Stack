import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/great_places.dart';
import '../screens/app_place_screen.dart';

class PlacesListScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Your Places'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () {
              Navigator.of(context).pushNamed(AddPlaceScreen.routeName);
            },
          ),
        ],
      ),
      body: FutureBuilder(
        future: Provider.of<GreatePlaces>(context, listen: false)
            .fetchAndSetPlaces(),
        builder: (context, snapshot) => snapshot.connectionState ==
                ConnectionState.waiting
            ? Center(
                child: CircularProgressIndicator(),
              )
            : Consumer<GreatePlaces>(
                builder: (context, greatePlaces, child) =>
                    greatePlaces.items.length <= 0
                        ? child
                        : ListView.builder(
                            itemCount: greatePlaces.items.length,
                            itemBuilder: (context, index) => ListTile(
                              leading: CircleAvatar(
                                backgroundImage:
                                    FileImage(greatePlaces.items[index].image),
                              ),
                              title: Text(greatePlaces.items[index].title),
                              onTap: () {
                                // TODO: Go to the detail page
                              },
                            ),
                          ),
                child: Center(
                  child: const Text('Go no places yet, start adding some!'),
                ),
              ),
      ),
    );
  }
}
