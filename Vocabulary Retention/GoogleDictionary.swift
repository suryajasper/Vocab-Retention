//
//  GoogleDictionary.swift
//  Vocabulary Retention
//
//  Created by Surya Jasper on 10/5/19.
//  Copyright © 2019 Surya Jasper. All rights reserved.
//

import Foundation
class GoogleDictionary {
    func FindDefinition(word: String, completionBlock: @escaping ([String]) -> Void) -> Void {
        let url = URL(string: "https://googledictionaryapi.eu-gb.mybluemix.net/?define=" + word + "&lang=en")!
        var def = [String]()
        let task = URLSession.shared.dataTask(with: url) { (data, response, error) in
            guard let dataResponse = data,
                error == nil else {
                    print(error?.localizedDescription ?? "Response Error")
                    return }
            do{
                //here dataResponse received from a network request
                let jsonResponse = try JSONSerialization.jsonObject(with:
                    dataResponse, options: [])
                guard let jsonArray = jsonResponse as? NSArray else {
                    return
                }
                let stuff = jsonArray[0] as! NSDictionary
                let meanings = stuff["meaning"] as! NSDictionary
                let allValues = meanings.allValues
                for meaning in allValues {
                    let meaning1 = meaning as! NSArray
                    let meaning2 = meaning1[0] as! NSDictionary
                    let definition = meaning2["definition"] as! String
                    //print("Definition " + definition);
                    def.append(definition);
                    //print(def);
                }
                completionBlock(def)
            } catch let parsingError {
                print("Error", parsingError)
            }
        }
        task.resume()
    }
}
